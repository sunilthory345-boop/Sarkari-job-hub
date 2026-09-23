import { GovJob } from '../types';

/**
 * Extracts Starting Date and Last Date cleanly from a GovJob
 */
export function getJobDates(job?: GovJob): { startingDate: string; lastDate: string } {
  if (!job) return { startingDate: '2026-09-01', lastDate: '2026-10-31' };
  const startingDate = job.importantDates?.applyStart || job.postedDate || '2026-09-01';
  const lastDate = job.importantDates?.applyEnd || job.lastDate || '2026-10-31';
  return { startingDate, lastDate };
}

const MONTHS_ENG = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_HIN = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];

/**
 * Formats YYYY-MM-DD to a human-readable bilingual date
 */
export function formatJobDate(dateStr: string, isHindi: boolean = false): string {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const monthNum = parseInt(parts[1], 10);
      const year = parts[0];
      if (monthNum >= 1 && monthNum <= 12) {
        return isHindi 
          ? `${day} ${MONTHS_HIN[monthNum - 1]} ${year}`
          : `${day} ${MONTHS_ENG[monthNum - 1]} ${year}`;
      }
    }
  } catch {
    // fallback to original
  }
  return dateStr;
}

/**
 * Calculates days remaining until lastDate
 */
export function getDaysRemaining(lastDateStr: string): number {
  if (!lastDateStr) return 0;
  try {
    const lastDate = new Date(lastDateStr);
    const today = new Date();
    // Reset time components to compare calendar days
    lastDate.setHours(23, 59, 59, 999);
    today.setHours(0, 0, 0, 0);

    if (isNaN(lastDate.getTime())) return 0;
    const diffTime = lastDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

/**
 * Returns latest vacancies sorted by newest starting date / posted date
 */
export function getLatestVacancies(jobs: GovJob[], limit?: number): GovJob[] {
  if (!Array.isArray(jobs)) return [];
  const validJobs = jobs.filter(j => j && typeof j === 'object' && j.id);
  const sorted = [...validJobs].sort((a, b) => {
    const dateA = a.importantDates?.applyStart || a.postedDate || '';
    const dateB = b.importantDates?.applyStart || b.postedDate || '';
    return dateB.localeCompare(dateA);
  });
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

/**
 * Returns vacancies whose last date is approaching soonest
 * Prioritizes active jobs with >= 0 days remaining, sorted ascending by last date
 */
export function getLastDateVacancies(jobs: GovJob[], limit?: number): GovJob[] {
  if (!Array.isArray(jobs)) return [];
  const validJobs = jobs.filter(j => j && typeof j === 'object' && j.id);
  const activeJobs = validJobs.filter(j => {
    const { lastDate } = getJobDates(j);
    const days = getDaysRemaining(lastDate);
    return days >= -2; // Include active or closing right now
  });

  const sorted = [...activeJobs].sort((a, b) => {
    const { lastDate: dateA } = getJobDates(a);
    const { lastDate: dateB } = getJobDates(b);
    const daysA = getDaysRemaining(dateA);
    const daysB = getDaysRemaining(dateB);

    // If both active, lowest days left comes first
    if (daysA >= 0 && daysB >= 0) {
      return daysA - daysB;
    }
    return dateA.localeCompare(dateB);
  });

  // Fallback if not enough active
  if (sorted.length < (limit || 4)) {
    const remaining = validJobs.filter(j => !sorted.some(s => s.id === j.id));
    sorted.push(...remaining);
  }

  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'SCRAPE_JOBS') {
      const jobCards = document.querySelectorAll('[data-occludable-job-id]');
      const jobs = [];
  
      jobCards.forEach(card => {
        const title = card.querySelector('h3')?.innerText?.trim();
        const company = card.querySelector('.base-search-card__subtitle')?.innerText?.trim();
        const link = card.querySelector('a.base-card__full-link')?.href;
        const postedText = card.innerText.toLowerCase(); // crude but reliable
  
        const minuteMatch = postedText.match(/(\d+)\s+minute/);
        const isJustNow = postedText.includes('just now');
  
        const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;
        const isRecent = isJustNow || (minuteMatch && minutes <= 30);
  
        if (isRecent) {
          jobs.push({
            title,
            company,
            timeText: isJustNow ? "Just now" : `${minutes} minutes ago`,
            link
          });
        }
      });
  
      sendResponse({ jobs });
    }
  });





// setTimeout(()=>{
//     const jobCards = document.querySelectorAll('.job-card-container');
//     const job = [];
    
//     jobCards.forEach(card => {
//         const title = card.querySelector('.job-card-list__title')?.innerText?.trim() || '';
//         const company = card.querySelector('.job-card-container__company-name')?.innerText?.trim() || '';
//         // const location = card.querySelector('.job-card-container__metadata-item')?.textContent.trim() || '';
//         const posted = card.querySelector('time')?.getAttribute('datetime') || '';
//         const link = card.querySelector('a.job-card-list__title')?.href || '';

//         // if (title && company && location && link) {
//         //     job.push({
//         //         title,
//         //         company,
//         //         location,
//         //         link
//         //     });
//         // }
//         const postDate = new Date(posted);
//         const hoursOld = (Date.now() - postDate.getTime()) / (1000 * 60 * 60);
//         if (hoursOld <= 24){
//             jobCards.push({title, company, posted, link});
//         }
//     });
//     window.__LINKEDIN_JOBS = job;
// }, 3000);


// // Wait until the job cards are rendered
// setTimeout(() => {
//     const jobCards = document.querySelectorAll('.job-card-container');
//     const jobs = [];
  
//     jobCards.forEach(card => {
//       const title = card.querySelector('.job-card-list__title')?.innerText?.trim();
//       const company = card.querySelector('.job-card-container__company-name')?.innerText?.trim();
//       const posted = card.querySelector('time')?.getAttribute('datetime') || '';
//       const link = card.querySelector('a.job-card-list__title')?.href;
  
//       // Filter for recent jobs (e.g., today or within 24h)
//       const postDate = new Date(posted);
//       const hoursOld = (Date.now() - postDate.getTime()) / (1000 * 60 * 60);
//       if (hoursOld <= 24) {
//         jobs.push({ title, company, posted, link });
//       }
//     });
  
//     // Share with popup
//     window.__LINKEDIN_JOBS__ = jobs;
//   }, 3000);


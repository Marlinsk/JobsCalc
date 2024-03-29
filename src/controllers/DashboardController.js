const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobsUtils = require('../utils/JobsUtils')

module.exports = {
  
    async index(req, res) {
    
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
        "progress": 0,
        "done": 0,
        "total": jobs.length
    }

    let jobTotalHours = 0

      const updatedJobs = jobs.map((job) => {
      const remaining = JobsUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
    
      // Somando a quantidade de status
      statusCount[status] += 1;   

      jobTotalHours = status == "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours; 
      
      //if(status == "progress"){
      //  jobTotalHours += Number(job["daily-hours"])
      //}  

      return {
        ...job,
        remaining,
        status,
        budget: JobsUtils.calculateBudget(job, profile["value-hours"]),
      };
    });
    
    const freehours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freehours: freehours});
  }
};
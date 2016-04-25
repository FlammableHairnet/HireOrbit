const knex = require('../../db/dbKnex');
const db = require('../../db/dbSequelize').sequelize;

const kanbanController = {
  insertJobs: function insertJobs(b) {
    return `insert into "indeed_jobs" ("jobtitle", "company",
      "city", "state", "country", "formattedlocation", "source", "date", "snippet", "url","latitude",
      "jobkey", "sponsored", "expired", "indeedapply", "formattedlocationfull", "nouniqueurl",
      "formattedrelativetime") VALUES($$${b.jobtitle}$$,$$${b.company}$$,'${b.city}','${b.state}','${b.country}',
      '${b.formattedlocation}',$$${b.source}$$,'${b.date}', $$${b.snippet}$$, $$${b.url}$$, '${b.latitude}', '${b.jobkey}', '${b.sponsored}', '${b.expired}', '${b.indeedapply}', '${b.formattedlocationfull}', 
      '${b.nouniqueurl}', '${b.formattedrelativetime}') ON CONFLICT DO NOTHING;`
  },

  // addJobsToKanban: function (req, res, next) {
  //   // var user_id = req.cookies.user_id || 12850819;
  //   var user_id = 12850819;
  //   var kanbanJobs = req.body;
  //   var bulkInsert = kanbanJobs.reduce((a,b) => {
  //     return a + kanbanController.insertJobs(b.job)
  //   }, "");
  //   // copy the jobs over to master table to maintain FK references
  //   db.query( bulkInsert )
  //     .then(() => {
  //       console.log('After bulk insert in kanban update')
  //       // get Max Rank from the DB
  //       return knex.raw(`select rank from workflow_state where user_id = ${user_id} ORDER BY rank DESC LIMIT 1`)
  //     })
  //     .then((results) => {
  //       console.log('rank from workflow table: ', results.rows[0].rank)
  //       var currentMaxRank = results.rows[0].rank;

  //       var kanbanUpdate = kanbanJobs.reduce((a, b) => {
  //         currentMaxRank+=1000
  //         return a+`insert into workflow_state("state", "jobkey_id", "notes", "user_id", "rank") 
  //         VALUES('${b.state}', '${b.job.jobkey}', '${b.notes}', ${user_id}, ${currentMaxRank})`
  //       }, "");

  //       return knex.raw( kanbanUpdate );
  //     })
  //     .then((message) => {
  //       console.log('Updated kanban to db: ', message);
  //       res.sendStatus(201);
  //     })
  //     .catch((err) => {
  //       console.log('Error Updating Kanban: ', err);
  //       res.status(501).send("Could not save Kanban to db: "+ err);
  //     })
  // },
}

module.exports = kanbanController;
// {
//   state: "",
//   job: {},
//   notes: ""
// }
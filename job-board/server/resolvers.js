import { Job } from './db.js';
import { Company } from './db.js';
export const resolvers = {
  Query: {
    job: async (root, { id }, context) => Job.findById(id),
    jobs: async () => Job.findAll(),
    company: async (root, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: async (root, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      console.log('[createJob] context: ', user);
      input.companyId = user.companyId;
      return Job.create(input);
      //or
      // return Job.create({...input,  companyId: user.companyId });
    },
    deleteJob: async (root, { input }, { user }) =>
      // Job.delete(input.id),
      {
        console.log(user);
        const job = await Job.findById(input.id);
        // user = await User.findById(user.id);
        if (!job) throw new Error('Job not found');
        if (job.companyId !== user.companyId) throw new Error('Not authorized');

        if (Job.delete(input.id)) return 'success';
        else return 'failure';
      },
    updateJob: async (root, { input }, { user }) => {
      console.log(user);
      const job = await Job.findById(input.id);
      // user = await User.findById(user.id);
      if (!job) throw new Error('Job not found');
      if (job.companyId !== user.companyId) throw new Error('Not authorized');
      else return Job.update({ ...input, companyId: user.companyId });
    },
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
    // jobs: (company) => Job.findAll({ companyId: company.id }),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};

import { useParams } from 'react-router';
// import { companies } from '../fake-data';
// import { useEffect, useState } from 'react';
// import { getCompany } from './graphql/queries';
import JobList from './JobList';
import { useCompany } from './graphql/hooks';

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Sorry, something went wrong</p>;
  }
  // console.log('companyId:', companyId);
  // const [company, setCompany] = useState(null);
  // useEffect(() => {
  //   console.log('mounted');
  //   getCompany(companyId).then(setCompany);
  // }, [companyId]);
  // if (!company) {
  //   return <p>Loading...</p>;
  // }
  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5>Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;

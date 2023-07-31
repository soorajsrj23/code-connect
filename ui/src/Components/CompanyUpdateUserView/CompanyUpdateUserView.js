import React, { useState, useEffect } from 'react';
import { Row, Col, Media, Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import './CompanyUpdateUserView.css';
import SmallNavbar from '../Navbar/SmallNavbar';

const CompanyUpdateUserView = () => {
  const [companyUpdates, setCompanyUpdates] = useState([]);

  useEffect(() => {
    getCompanyUpdates();
  }, []);

  const getCompanyUpdates = async () => {
    try {
      const response = await fetch('http://localhost:4000/company-updates', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();

      // Resolve the Promises using Promise.all
      const resolvedCompanyUpdates = await Promise.all(
        data.map(async (companyData) => {
          const companyDetails = await getCompanyDetails(companyData.idOfPostedCompany);
          return { ...companyData, companyDetails };
        })
      );

      setCompanyUpdates(resolvedCompanyUpdates);
    } catch (error) {
      console.error(error);
    }
  };

  const getCompanyDetails = async (companyId) => {
    try {
      const response = await fetch(`http://localhost:4000/companies/${companyId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const companyData = await response.json();
      // Add the fetched company details to companyData object
      // For example: companyData.name, companyData.industry, etc.
      return companyData;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="company-update-user-container">
      <SmallNavbar/>
        <div className="company-update-user-container">
      {companyUpdates.map((companyData) => (
        <Card key={companyData._id} className="company-update-user-view">
          <CardBody>
            <Row>
              <Col xs={12} sm={4} md={3} lg={2}>
              <div className="company-info">
                {companyData.companyDetails.image && (
                  <img
                  object
                  src={`data:${companyData.companyDetails.image.contentType};base64,${btoa(
                    new Uint8Array(companyData.companyDetails.image.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  )}`}
                  className='company-icon'
                  />
                )}
                <div className='info-text'>
                <h2 className='text-white'>{companyData.companyDetails.companyName}</h2>
                <p  className='text-white'>{companyData.companyDetails.Industry}</p>
                </div>
               <hr className='text-white'/>
              </div>
              </Col>
              <hr />
            </Row>
            <Row>
              <Col xs={12} sm={2} md={9} lg={10}>
                <div className="company-update-body">
                  <CardTitle tag="h4" className="update-title">
                    {companyData.title}
                  </CardTitle>
                  <CardImg
                    src='https://th.bing.com/th/id/OIP.bZQXYNTiAxCs2y27fK6PlgAAAA?pid=ImgDet&w=300&h=152&rs=1'
                    alt={companyData.title}
                    className="update-image"
                  />
                  <CardText className="update-paragraph">{companyData.content}</CardText>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default CompanyUpdateUserView;

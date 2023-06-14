import React from 'react'

import '@coreui/coreui/dist/css/coreui.min.css'

import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CContainer } from '@coreui/react'

import { CardContent, Card } from '@mui/material'

const Faq = () => {
  const styles = {
    marginTop: '30px'
  }

  return (
    <>
      <Card>
        <CardContent>
          <CContainer>
            <h3>FAQs (Frequently Asked Questions) </h3>
            <CAccordion activeItemKey={1} style={styles}>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>What is a Maid App?</CAccordionHeader>
                <CAccordionBody>
                  A Maid App is an application that allows you to find and book reliable, professional, and verified
                  maids for various household services such as cleaning, washing, etc. You can use the app to search for
                  maids in your area, view their profiles, ratings, and reviews, and schedule a service at your
                  convenience.
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader style={{ fontSize: '1.35rem', fontWeight: '400' }}>
                  How do I know if the maids' are trustworthy and qualified?
                </CAccordionHeader>
                <CAccordionBody>
                  All the maids on the app are verified by the app provider through background checks using identity
                  verification, and skill assessment. The app also displays the ratings and reviews of the maids from
                  previous customers, so you can see their performance and feedback. Additionally, the app provides
                  customer support and grievance redressal in case of any issues or complaints.
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>What are the benefits of using a maid app?</CAccordionHeader>
                <CAccordionBody>
                  <strong>Using a maid app has many benefits such as:</strong>
                  <ul>
                    <li>
                      You can save time and hassle by finding and booking maids online instead of searching offline or
                      through agencies.
                    </li>
                    <li>
                      You can choose from a wide range of services and maids according to your needs and preferences.
                    </li>
                    <li>You can get quality service at affordable rates and flexible timings.</li>
                    <li>You can track the status of your service and communicate with the maid through the app.</li>
                    <li>You can rate and review the maid after the service and provide feedback for improvement.</li>
                  </ul>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>What are the charges for using a maid app?*</CAccordionHeader>
                <CAccordionBody>
                  The charges for using a maid app vary depending on the type of service, duration of service, location
                  of service, and experience of the maid. The app will show you the estimated cost of the service before
                  you book it. You can also compare the prices of different maids and choose the one that suits your
                  budget.
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>What if I am not satisfied with the domestic helper that I hire?</CAccordionHeader>
                <CAccordionBody>
                  If you're not satisfied with the domestic helper you hire through our app, we offer a replacement
                  service to find a more suitable match. You can also provide feedback for additional training and
                  improvement. We may offer a refund or credit for the services in certain cases of substantial
                  dissatisfaction. We aim to ensure your satisfaction, and we're committed to promptly addressing your
                  concerns. Contact our customer support team, and we'll work closely with you to find a solution that
                  meets your needs.
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>How do I cancel or modify my booking of a domestic helper?</CAccordionHeader>
                <CAccordionBody>
                  To cancel or modify your booking of a domestic helper, you can easily do so by contacting our
                  application team and raising a query. Simply reach out to our customer support team through the
                  MaidApp website and provide them with the necessary details of your booking. They will assist you in
                  making the desired changes or canceling the booking altogether.
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>How do I contact you for any queries or feedback?</CAccordionHeader>
                <CAccordionBody>
                  To contact us for any queries or feedback, you can easily raise a query through our website. Simply
                  navigate to the contact or support section, and you will find a form or a dedicated button to submit
                  your query.
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default Faq

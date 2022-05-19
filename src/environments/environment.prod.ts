export const environment = {
  production: true,
  // ------- For Development
  // idmLoginURL: "https://ry1drvemksr1.mof.gov.sa:50301/irj/servlet/prt/portal/prtroot/pcd!3aportal_content!2fmof.gov.sa.f_mof_base!2fmof.gov.sa.f_iviews!2fmof.gov.sa.i_auction",
  // idmLogoutUrl: "https://ry1drvemksr1.mof.gov.sa/sap/public/bc/icf/logoff?sap-client=100",
  // idmHomeUrl: "https://10.14.8.61:8055",
  apiAuctionURL : "/internal/v1/e-auction/auctions",
  apiFilenetURL : "/internal/v1/e-auction/files",
  apiCommiteeURL : "/internal/v1/e-auction/committees",
  apiBidderFinalInvoiceURL : "/mock-internal/auctions/1/final-invoice",
  apiBidderAuctions : "/mock-internal/auctions",
  // ------- For Pre-Prod
  idmLoginURL: "https://ry1srvemkjv1.mof.gov.sa/irj/servlet/prt/portal/prtroot/pcd!3aportal_content!2fmof.gov.sa.f_mof_base!2fmof.gov.sa.f_iviews!2fmof.gov.sa.i_auction",
  idmLogoutUrl: "https://ry1srvemkab1.mof.gov.sa/sap/public/bc/icf/logoff?sap-client=100",
  idmHomeUrl: "https://loginpp.etimad.sa/",
  // apiAuctionURL : "https://testpartnerapi.etimad.sa/internal/v1/e-auction/auctions",
  // apiFilenetURL : "https://testpartnerapi.etimad.sa/internal/v1/e-auction/files",
  // apiCommiteeURL : "https://testpartnerapi.etimad.sa/internal/v1/e-auction/committees",
  // apiBidderFinalInvoiceURL : "/mock-internal/auctions/1/final-invoice",
  // apiBidderAuctions : "/mock-internal/auctions",
};
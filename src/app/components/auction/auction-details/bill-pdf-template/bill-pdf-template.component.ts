import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-pdf-template',
  templateUrl: './bill-pdf-template.component.html',
  styleUrls: ['./bill-pdf-template.component.scss']
})
export class BillPdfTemplateComponent implements OnInit {

  pdfTemplateListData: any;
  pagelimit: number = 10;

  // invoice list varialble
  applicationPrintingDate: string
  operationReferenceNo: string
  operationDate: string
  productsType: string
  invoiceAmt: string
  facilityName: string
  commercialRegistrationNo: number
  entityName: string
  entityNo: number
  deliveryDate: string
  region: string
  city: string
  district: string
  street: string
  otherNotes: string
  constructor() { }

  public arrayofobject = {
    applicationPrintingDate: '02-02-2021',
    operationReferenceNo: '#FPI-E8377',
    operationDate: '2020-10-28',
    productsType: 'transportation cars',
    invoiceAmt: '4,103,128.7 SAR',
    facilityName: 'national identity',
    commercialRegistrationNo: '707365514',
    entityName: 'Ministry of Health',
    entityNo: '937',
    deliveryDate: '2022-02-05',
    region: 'Riyadh',
    city: 'Riyadh',
    district: 'Second industrial',
    street: 'Ahmed Bin Abdullah Al Shehri Street',
    otherNotes: 'Warehouse No. 546',
  };

  ngOnInit(): void {
    this.mapping(this.arrayofobject);
  }

  public mapping(results: any) {
    this.applicationPrintingDate = results['applicationPrintingDate'] ? results['applicationPrintingDate'] : '';
    this.operationReferenceNo = results['operationReferenceNo'] ? results['operationReferenceNo'] : '';
    this.operationDate = results['operationDate'] ? results['operationDate'] : '';
    // this.operationDate                = results['operationDate'] ? results['operationDate'] === 0 ? results['operationDate'] : '' : '';
    this.productsType = results['productsType'] ? results['productsType'] : '';
    this.invoiceAmt = results['invoiceAmt'] ? results['invoiceAmt'] : '';
    this.facilityName = results['facilityName'] ? results['facilityName'] : '';
    this.commercialRegistrationNo = results['commercialRegistrationNo'] ? results['commercialRegistrationNo'] : '';
    this.entityName = results['entityName'] ? results['entityName'] : '';
    this.entityNo = results['entityNo'] ? results['entityNo'] : '';
    this.deliveryDate = results['deliveryDate'] ? results['deliveryDate'] : '';
    this.region = results['region'] ? results['region'] : '';
    this.city = results['city'] ? results['city'] : '';
    this.district = results['district'] ? results['district'] : '';
    this.street = results['street'] ? results['street'] : '';
    this.otherNotes = results['otherNotes'] ? results['otherNotes'] : '';
  }

}

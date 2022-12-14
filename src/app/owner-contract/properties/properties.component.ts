import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { companyDTO } from 'src/app/core/models/interfaces/reale-state/company';
import { REProjectTypeDTO } from 'src/app/core/models/interfaces/reale-state/projectType';
import { RealEstateLocationDTO } from 'src/app/core/models/interfaces/reale-state/RELocation';
import { REPropertyTypeDTO } from 'src/app/core/models/interfaces/reale-state/REpropertyType';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {MatTableDataSource} from '@angular/material/table';
import { PropertyMangamentGridDto, RealEstateProperty } from 'src/app/core/models/interfaces/reale-state/REProperty';
import { PropertyServiceService } from 'src/app/core/services/property-service.service';

const SampleData: PropertyMangamentGridDto[]= [
{Company:'Quismar Dominicana',ProjectType:'Royal Lake Village',PropertyType:'Villa',Location:'Cofresi',BathRooms:2.5,BedRooms:2,BuildingSize:250,Description:'pv-sample',RealEstatePropertyID:1,Status:'Sold'}
,{Company:'Hacienda Tropical Club & Resorts, SRL',ProjectType:'The Cliff',PropertyType:'Villa',Location:'Cofresi',BathRooms:1.5,BedRooms:2,BuildingSize:250,Description:'pv-sample',RealEstatePropertyID:1,Status:'Available'}
,{Company:'Quismar Dominicana',ProjectType:'Royal Lake Village',PropertyType:'Villa',Location:'Cofresi',BathRooms:3.5,BedRooms:2,BuildingSize:250,Description:'pv-sample',RealEstatePropertyID:1,Status:'Sold'}
,{Company:'Quismar Dominicana',ProjectType:'Royal Suite',PropertyType:'Villa',Location:'Cofresi',BathRooms:2.5,BedRooms:2,BuildingSize:250,Description:'pv-sample',RealEstatePropertyID:1,Status:'Available'}
,{Company:'Costa Esmeralda',ProjectType:'Royal Lake Village',PropertyType:'Villa',Location:'Cofresi',BathRooms:4.5,BedRooms:2,BuildingSize:250,Description:'pv-sample',RealEstatePropertyID:1,Status:'Sold'}
,{Company:'Quismar Dominicana',ProjectType:'Royal Lake Village',PropertyType:'Villa',Location:'Cofresi',BathRooms:2.5,BedRooms:2,BuildingSize:250,Description:'pv-sample',RealEstatePropertyID:1,Status:'Sold'}
,{Company:'Sunrise Properties',ProjectType:'Sunrise Suite',PropertyType:'Villa',Location:'Cofresi',BathRooms:1.5,BedRooms:2,BuildingSize:250,Description:'pv-sample',RealEstatePropertyID:1,Status:'Available'}
];

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})


export class PropertiesComponent implements OnInit {

 
  companies: companyDTO[] = [
    {description:'Lifestyle Holidays Assets Holding,SRL',realEstateCompanyID:1},
    {description:'Quismar Dominicana',realEstateCompanyID:3},
    {description:'Hacienda Tropical Club & Resorts, SRL',realEstateCompanyID:5},
    {description:'Costa Esmeralda',realEstateCompanyID:6},
    {description:'Sunrise Properties',realEstateCompanyID:7}
  ];

  project: REProjectTypeDTO[] = [
    {Description:'Crown Suite',RealEstateCompanyID:1,RealEstateProjectTypeID:1}
    ,{Description:'Royal Suite',RealEstateCompanyID:1,RealEstateProjectTypeID:1}
    ,{Description:'Royal Villas',RealEstateCompanyID:1,RealEstateProjectTypeID:5}
    ,{Description:'Crown Villas',RealEstateCompanyID:1,RealEstateProjectTypeID:1}
    ,{Description:'Villa Park',RealEstateCompanyID:1,RealEstateProjectTypeID:3}
    ,{Description:'The Cliff',RealEstateCompanyID:1,RealEstateProjectTypeID:6}
    ,{Description:'Others',RealEstateCompanyID:1,RealEstateProjectTypeID:11}
    ,{Description:'Royal Lake Village',RealEstateCompanyID:1,RealEstateProjectTypeID:3}
    ,{Description:'Sunrise Suite',RealEstateCompanyID:1,RealEstateProjectTypeID:7}
  ]
  location: RealEstateLocationDTO[] = [
    {description:'Cofresi', realEstateLocationID:1}
    ,{description:'Punta Cana', realEstateLocationID:2}
    
  ]
  proType: REPropertyTypeDTO[] = [
    {description:'Apartments',realEstatePropertyTypeID:1},
    {description:'Villas',realEstatePropertyTypeID:2},
    {description:'Lake view',realEstatePropertyTypeID:3},
    {description:'Lake view High',realEstatePropertyTypeID:4},
    {description:'Lake Shore',realEstatePropertyTypeID:6},
    {description:' Pool Houses ',realEstatePropertyTypeID:7},
    {description:'Summer Houses ',realEstatePropertyTypeID:9},
    {description:'Summer Rock ',realEstatePropertyTypeID:10},
    {description:'Garden houses',realEstatePropertyTypeID:11}
  ] 

  displayedColumns: string[] = ['Status', 'Company', 'ProjectType', 'PropertyType', 'Location', 'Description', 'BedRooms', 'BathRooms', 'BuildingSize','Actions'];
  dataSource =new MatTableDataSource<PropertyMangamentGridDto>;
  
  lstPropiedades: PropertyMangamentGridDto[] = [] 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  selectedCompany = this.companies[0].realEstateCompanyID;

  constructor(private formbuilder:FormBuilder, private propertyService:PropertyServiceService) { }

   _property!:RealEstateProperty
  //  SendClicked = false;
  form!:FormGroup;

  ngOnInit(): void {

    this.initialFormGroup();
  }

  initialFormGroup(){
    this.form = this.formbuilder.group(
      {realEstatePropertyID:[0]
      ,description:['',Validators.required ]
      ,active:1
      ,realEstateLocationID:[,Validators.required ]
      ,realEstateProjectTypeID:[,Validators.required ]
      ,realEstatePropertyTypeID:[,Validators.required ]
      ,rooms:[,Validators.required]
      ,bathrooms:[1,Validators.required ]
      ,buildingSize:[,Validators.required ]
      ,landSize:[,Validators.required ]
      ,lotePrice:[,Validators.required ]
      ,unitPrice:[0,Validators.required ]
      ,minPrice:[0,Validators.required ]
      ,maxPrice:[0,Validators.required ]
  }); 
}


ngAfterViewInit() {

  this.getPropertiesData();
  }

  onSubmit(){
      this.propertyService.SaveProperty(this.form.value).subscribe(
        (res:any) =>{
          this._property = res
          this.editProperty();
          this.getPropertiesData();
          // console.log(res)
        }
      );
  }

editProperty(){
  this.form.setValue(this._property)
}
 public onNewClick(): void {
  this._property
    this.form.reset();
  }

  
  getPropertiesData(){
    this.propertyService.getProperty().subscribe(
      (x:any) => {
        this.lstPropiedades = x;
        this.dataSource = new MatTableDataSource<PropertyMangamentGridDto>(this.lstPropiedades)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatFormFieldModule,MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {NgModule} from '@angular/core';

@NgModule({
	imports: [MatButtonModule,MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSelectModule,FormsModule,ReactiveFormsModule,MatTableModule],
	exports: [MatButtonModule,MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSelectModule,FormsModule,ReactiveFormsModule,MatTableModule], 
	
})

export class MaterialModule {}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/shared/list-service.service';


@Component({
    selector: 'app-favorite-films',
    templateUrl: './favorite-films.component.html',
    styleUrls: ['./favorite-films.component.scss']
})
export class FavoriteFilmsComponent implements OnInit {

    public favorite: Array<any> = [];
    public moreInfo!: any;
    public moreDetails: boolean = false;

    constructor(
        private listServise: ListServiceService,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.loadFilms();
    }
    
    loadFilms(): void {
        this.listServise.get().subscribe(data => {
            this.favorite = data;
        })
    }

    getIDList(id: number): void {
        this.listServise.getbyID(id).subscribe(data => {
            this.moreInfo = data;
            this.moreDetails = true;
        })
    }

    deletefilm(favorite: any): void {
        this.listServise.delete(favorite.id as number).subscribe(
            () => {
                this.loadFilms();
            }, err => {
                console.log(err);
            })
    }

}

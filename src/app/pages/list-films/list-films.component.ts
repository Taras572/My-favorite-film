import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/shared/list-service.service';


@Component({
	selector: 'app-list-films',
	templateUrl: './list-films.component.html',
	styleUrls: ['./list-films.component.scss']
})
export class ListFilmsComponent implements OnInit {

	public searchField!: string;
	public dataFilm!: any;
	public idFilm!: any;
	public moreDetails: boolean = false;
	public numbPage: number = 1;
	public count: number = 1;
	public favorite: Array<any> = [];
	public text_count: boolean = true;
	public block_info_width: boolean = false;
	public text_info!: string;

	
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

	reset(): void {
		this.count = 1;
		this.numbPage = 1;
	}

	getAllList(movies: string, numb: number): void {
		this.block_info_width = false;
		if (movies) {
			this.http.get<any>(`http://www.omdbapi.com/?s=${movies}&page=${numb.toString()}&apikey=b85c1834`).subscribe(
				data => {
					if (data.totalResults != undefined) {
						this.dataFilm = data.Search;
						this.numbPage = data.totalResults / 10;
						this.text_count = false;
					}
					else {
						this.text_info = 'Nothing found';
						this.block_info_width = true;
					}
				});
		}
		else {
			this.dataFilm = null;
			this.text_count = true;
		};
	}

	getIDList(id: string): void {
		this.http.get<any>(`http://www.omdbapi.com/?i=${id}&apikey=b85c1834`).subscribe(
			data => {
				this.idFilm = data;
				this.moreDetails = true;
			});
	}

	addMyList(id: string): void {
		let count = true;
		this.block_info_width = false;
		this.favorite.forEach((elem) => {
			if (elem.imdbID == id) {
				count = false;
			}
		});

		if (count == true) {
			this.http.get<any>(`http://www.omdbapi.com/?i=${id}&apikey=b85c1834`).subscribe(
				data => {
					this.listServise.create(data).subscribe(() => {
						this.loadFilms();
					}, err => {
						console.log(err);
					});
				});
		}
		else {
			this.text_info = 'You have alredy choose this movie';
			this.block_info_width = true;
		};
	}

	
	getCount(checker: boolean): void {
		if (checker && this.count < this.numbPage) {
			this.count++;
			this.getAllList(this.searchField, this.count);
		}
		else if (checker == false && this.count > 1) {
			this.count--;
			this.getAllList(this.searchField, this.count);
		}
	}

}

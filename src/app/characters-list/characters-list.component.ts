import { CharactersListService } from './../characters-list.service';
import { Character } from './../models/character';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  title: string = 'League of Legends Characters Manager';
  charactersList: Character[] = [];
  selectedCharacter?: Character;
  characterForm: FormGroup;

  statuts = [
    { id: 'active', value: true },
    { id: 'inactive', value: false },
  ];

  constructor(private characterService: CharactersListService) {
    this.characterForm = new FormGroup({
      name: new FormControl(),
      title: new FormControl(),
      active: new FormControl(this.statuts[2]),
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.characterService.getAll().subscribe({
      next: (data) => (this.charactersList = data),
      error: (err) => console.error(err),
      complete: () => console.log('characters service done'),
    });
  }

  create(): void {
    let newCharacter = { ...this.characterForm.value };
    this.characterService.create(newCharacter).subscribe(() => this.getAll());
  }

  delete(character: Character): void {
    this.characterService.delete(character.id).subscribe(() => this.getAll());
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = { ...character };
  }

  onManage(modifiedCharacter: Character): void {
    this.characterService.put(modifiedCharacter).subscribe({
      next: () => null,
      error: (err) => console.error(err),
      complete: () => {
        console.log('Character modification ok');
        this.getAll();
        this.selectedCharacter = undefined;
      },
    });
  }
}

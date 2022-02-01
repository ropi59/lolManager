import { Character } from './../models/character';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  @Input() selectedCharacter!: Character;
  @Input() newName!: string;
  @Input() newTitle!: string;
  @Input() newStatut!: boolean;

  statuts = [
    { id: 'active', value: true },
    { id: 'inactive', value: false },
  ];

  @Output() characterModified: EventEmitter<Character> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  update(): void {
    let modifiedCharacter: Character = {
      id: this.selectedCharacter.id,
      name: this.newName,
      title: this.newTitle,
      active: this.newStatut,
    };
    this.characterModified.emit(modifiedCharacter);
  }
}

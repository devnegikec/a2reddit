import { Component, EventEmitter, Input, OnInit, Output } from 'angular2/core';
import { Character, CharacterService } from '../character/character.service';
import { CharacterComponent } from '../character/character.component';

@Component({
  selector: 'story-characters',
  styles: [ require('./characters.css') ],
  template: require('./characters.html'),
  directives: [CharacterComponent],
  providers: [CharacterService]
})
export class CharactersComponent implements OnInit {
  @Output() changed = new EventEmitter<Character>();
  @Input() storyId: number;
  characters: Character[];
  selectedCharacter: Character;

  constructor(private _characterService: CharacterService) { }

  ngOnInit() {
    this._characterService.getCharacters(this.storyId)
      .subscribe(characters => this.characters = characters);
  }

  select(selectedCharacter: Character) {
    this.selectedCharacter = selectedCharacter;
    this.changed.emit(selectedCharacter);
  }
}

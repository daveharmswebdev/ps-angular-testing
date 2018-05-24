import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";

describe('Heroes Component - shallow test', () => {
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  });
});

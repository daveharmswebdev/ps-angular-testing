import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('Heroes Component - deep test', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    HEROES = [
      { id: 11, name: 'Mr. Nice', strength: 10 },
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 }
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: HeroService, useValue: mockHeroService
        }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentsDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponentsDebugElements.length).toBe(3);

    HEROES.forEach((hero, index) => {
      const actualHero = heroComponentsDebugElements[index].componentInstance.hero

      expect(actualHero).toEqual(hero);
    });
  });

  it(`should call heroService.deleteHero when HeroComponent delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // #1 trigger the click event on the child component template
    // heroComponents[1].query(By.css('button'))
    //   .triggerEventHandler('click', {stopPropagation: () => {}});
    // #2 trigger the event emitter on the child component
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    // #3 trigger the delete event on the child component directive
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = "Wolverine";
    mockHeroService.addHero.and.returnValue(of(<Hero>{id: 5, name: name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    // act
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // assert
    const heroText = fixture.debugElement.queryAll(By.css('li'))[3].nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    HEROES.forEach((hero: Hero, index) => {
      let routerLink = heroComponents[index]
        .query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub)

      heroComponents[index].query(By.css('a')).triggerEventHandler('click', null);

      expect(routerLink.navigatedTo).toBe(`/detail/${hero.id}`);
    });

  });

});

import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";

describe('Heroes Component', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 11, name: 'Mr. Nice', strength: 10 },
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 }
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {

    it('should remove indicated hero from heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2])

      expect(component.heroes).toEqual([
        { id: 11, name: 'Mr. Nice', strength: 10 },
        { id: 12, name: 'Narco', strength: 5 },
      ]);
    });

    it('should call delete hero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2])

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});

import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Game} from '../../Game';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../boards/ISpace';
import {PlayerInput} from '../../PlayerInput';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ResearchOutpost extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.RESEARCH_OUTPOST,
      tags: [Tags.SCIENCE, Tags.CITY, Tags.BUILDING],
      cost: 18,
      hasRequirements: false,

      metadata: {
        cardNumber: '020',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a card, you pay 1 MC less for it.', (eb) => {
            eb.empty().startEffect.megacredits(-1);
          }).br;
          b.city();
        }),
        description: 'Place a city tile NEXT TO NO OTHER TILE.',
      },
    });
  }
  private getAvailableSpaces(player: Player, game: Game): Array<ISpace> {
    return game.board.getAvailableSpacesOnLand(player)
      .filter((space) => {
        const adjacentSpaces = game.board.getAdjacentSpaces(space);
        return adjacentSpaces.filter((space) => space.tile !== undefined).length === 0;
      });
  }
  public canPlay(player: Player, game: Game): boolean {
    return this.getAvailableSpaces(player, game).length > 0;
  }
  public getCardDiscount() {
    return 1;
  }
  public play(player: Player, game: Game): PlayerInput {
    return new SelectSpace('Select place next to no other tile for city', this.getAvailableSpaces(player, game), (foundSpace: ISpace) => {
      game.addCityTile(player, foundSpace.id);
      return undefined;
    });
  }
}

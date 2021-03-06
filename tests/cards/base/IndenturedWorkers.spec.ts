import {expect} from 'chai';
import {IndenturedWorkers} from '../../../src/cards/base/IndenturedWorkers';
import {MicroMills} from '../../../src/cards/base/MicroMills';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestingUtils';

describe('IndenturedWorkers', function() {
  let card: IndenturedWorkers;
  let player: Player;
  let game: Game;

  beforeEach(() => {
    card = new IndenturedWorkers();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player, TestPlayers.RED.newPlayer()], player);
  });

  it('play', () => {
    const action = card.play();
    expect(action).is.undefined;
    player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
    expect(player.victoryPointsBreakdown.victoryPoints).to.eq(-1);
    expect(card.getCardDiscount(player, game)).to.eq(0);
  });

  it('Should apply card discount until next card played', () => {
    player.playCard(game, card);
    expect(card.getCardDiscount(player, game)).to.eq(8);

    player.playCard(game, new MicroMills());

    expect(card.getCardDiscount(player, game)).to.eq(0);
  });

  it('Change in generation disables Indentured Workers', () => {
    player.playCard(game, card);
    expect(card.getCardDiscount(player, game)).to.eq(8);

    player.pass(game);

    expect(card.getCardDiscount(player, game)).to.eq(0);
  });
});

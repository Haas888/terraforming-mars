import {expect} from 'chai';
import {Solarnet} from '../../../src/cards/venusNext/Solarnet';
import {TestPlayers} from '../../TestingUtils';

describe('Solarnet', function() {
  it('Should play', function() {
    const card = new Solarnet();
    const player = TestPlayers.BLUE.newPlayer();
    expect(card.canPlay(player)).is.not.true;
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.cardsInHand).has.lengthOf(2);
  });
});

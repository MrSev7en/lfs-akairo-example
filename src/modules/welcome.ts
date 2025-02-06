import type { Akairo, Player, Players } from 'lfs-akairo';
import { Module } from 'lfs-akairo';
import { ButtonStyle, PacketType } from 'node-insim/packets';

export class WelcomeModule extends Module {
  public constructor(public readonly akairo: Akairo) {
    super(akairo);

    this.onPacket(PacketType.ISP_NCI, this.onPlayerJoin.bind(this));
    this.onPacket(PacketType.ISP_NPL, this.onPlayerTrack.bind(this));
    this.onTick(1000, this.everyOneSecond);
  }

  public async onPlayerJoin(player: Player) {
    player.set('counter', 0);

    player.message(player.t('messages.welcome', { userName: player.userName }));

    player
      .button()
      .setStyle(() => ButtonStyle.ISB_DARK)
      .setTitle(() => String(player.get<number>('counter')))
      .setWidth(() => 25)
      .setHeight(() => 25)
      .setLeft(() => 50)
      .setTop(() => 50)
      .appendChild(
        player
          .button()
          .setStyle(() => ButtonStyle.ISB_DARK)
          .setTitle(() => String(player.get<number>('counter') + 1))
          .setWidth(() => 25)
          .setHeight(() => 25)
          .setLeft(() => 50)
          .setTop(() => 75),
      )
      .create()
      .onUpdate((button) => {
        if (player.get<number>('counter') > 20) {
          button.destroy();
        }
      });
  }

  public async onPlayerTrack(player: Player) {
    player
      .message(player.t('messages.speed.remember'))
      .message(player.t('messages.speed.velocity'));
  }

  public async everyOneSecond(players: Players) {
    for (const player of players.list) {
      const counter = player.get<number>('counter');

      if (counter <= 20) {
        player.set('counter', counter + 1);
      }
    }
  }
}

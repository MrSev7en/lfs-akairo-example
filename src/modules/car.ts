import type { Akairo, Player } from 'lfs-akairo';
import { Module } from 'lfs-akairo';
import { MessageSound } from 'node-insim/packets';

export class CarModule extends Module {
  public constructor(public readonly akairo: Akairo) {
    super(akairo);

    this.onCommand('tp', this.onTeleportCommand.bind(this));
    this.onCommand(['repair', 'reparar'], this.onRepairCommand.bind(this));
    this.onUnknownCommand(this.onCommandNotFound.bind(this));
  }

  public async onTeleportCommand(player: Player, args: string[]) {
    const userName = args.join(' ');
    const otherPlayer = this.akairo.players.getByUserName(userName);

    if (!otherPlayer) {
      player.message(
        player.t('commands.teleport.not-found', { userName }),
        MessageSound.SND_ERROR,
      );

      return;
    }

    this.akairo.cars.teleportPlayerCar(player, otherPlayer);

    player.message(
      player.t('commands.teleport.success.self', {
        userName: otherPlayer.userName,
      }),
    );

    otherPlayer.message(
      otherPlayer.t('commands.teleport.success.other', {
        userName: player.userName,
      }),
    );
  }

  public async onRepairCommand(player: Player) {
    this.akairo.cars.resetPlayerCar(player);
    player.message(player.t('commands.repair'));
  }

  public async onCommandNotFound(player: Player) {
    player.message(player.t('commands.not-found'));
  }
}

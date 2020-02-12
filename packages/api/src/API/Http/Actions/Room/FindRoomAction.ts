import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import Presenter from '../../Presenter/Room/FindRoomPresenter';
import { success } from '../../Presenter/Base/success';
import { HTTP_CODES } from '../../Enums/HttpCodes';
import FindRoomAdapter from '../../Adapters/Room/FindRoomAdapter';
import FindRoomHandler from '../../../../Application/Handlers/Room/FindRoomHandler';
import FindRoomCommand from '../../../../Application/Commands/Room/FindRoomCommand';
import Room from '../../../../Domain/Entities/Room';

@injectable()
class FindRoomAction {
  private adapter: FindRoomAdapter;
  private handler: FindRoomHandler;
  constructor(@inject(FindRoomAdapter) adapter: FindRoomAdapter, @inject(FindRoomHandler) handler: FindRoomHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }
  public async execute(req: Request, res: Response) {
    const command: FindRoomCommand = await this.adapter.from(req);
    const response: Room[] = await this.handler.execute(command);
    const presenter = new Presenter(response);

    res.status(HTTP_CODES.OK).json(success(presenter.getData(), null));
  }
}

export default FindRoomAction;
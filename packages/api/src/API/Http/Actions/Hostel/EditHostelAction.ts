import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import Presenter from '../../Presenters/Hostel/EditHostelPresenter';
import { success } from '../../Presenters/Base/success';
import { HTTP_CODES } from '../../Enums/HttpCodes';
import EditHostelAdapter from '../../Adapters/Hostel/EditHostelAdapter';
import EditHostelHandler from '../../../../Application/Handlers/Hostel/EditHostelHandler';

@injectable()
class EditHostelAction {
  private adapter: EditHostelAdapter;
  private handler: EditHostelHandler;
  constructor(
    @inject(EditHostelAdapter) adapter: EditHostelAdapter,
    @inject(EditHostelHandler) handler: EditHostelHandler,
  ) {
    this.adapter = adapter;
    this.handler = handler;
  }
  public async execute(req: Request, res: Response) {
    const command: any = await this.adapter.from(req);
    const response: any = await this.handler.execute(command);
    const presenter = new Presenter(response);

    res.status(HTTP_CODES.OK).json(success(presenter.getData(), 'hostel edited successfully'));
  }
}

export default EditHostelAction;
class DeleteRoomCommand {
  private readonly id: number;
  constructor(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }
}

export default DeleteRoomCommand;

/* eslint-disable indent */
import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class Message extends Model<Message> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;
}

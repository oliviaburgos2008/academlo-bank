import { UserService } from '../users/users.service.js';
import { TransferService } from './transfers.service.js';

export const makeTransfer = async (req, res) => {
  try {
    const { amount, recipientAccountNumber, senderAccountNumber } = req.body;

    const recipientUserPromise = await UserService.findOneAccount(
      recipientAccountNumber
    );

    const senderUserPromise = await UserService.findOneAccount(
      senderAccountNumber
    );

    const [recipientUser, senderUser] = await Promise.all([
      recipientUserPromise,
      senderUserPromise,
    ]);

    if (!recipientUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Recipient account does not exits',
      });
    }

    if (!senderUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Sender account does not exits',
      });
    }

    if (amount > senderUser.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'insufficient balance',
      });
    }

    const newRecipientBalance = amount + recipientUser.amount;
    const newSenderBalance = senderUser.amount - amount;

    const updateSenderUserPromise = UserService.updateAmount(
      recipientUser,
      newRecipientBalance
    );
    const updateRecipientUserPromise = UserService.updateAmount(
      senderUser,
      newSenderBalance
    );
    const transferPromise = TransferService.createRecordTransfer(
      amount,
      senderUser.id,
      recipientUser.id
    );

    await Promise.all([
      updateSenderUserPromise,
      updateRecipientUserPromise,
      transferPromise,
    ]);

    return res.status(201).json({
      message: 'transfer ok!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

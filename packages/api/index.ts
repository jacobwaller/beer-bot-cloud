import { HttpFunction } from '@google-cloud/functions-framework';
import {
  createDeliveryEntry,
  getDeliveryByIndex,
  getOptionsEntries,
  setDeliveredEntry,
  setOptionsEntries,
} from './dbHandler';
import {
  IndexValidator,
  UuidValidator,
} from './common_lib/src/simpleValidators';
import { GetDeliveryRequestValidator } from './common_lib/src/delivery';
import { SetOptionsValidator } from './common_lib/src/option';

export const getDelivery: HttpFunction = async (req, res) => {
  const strIndex = req.path.split('/')[2];
  const index = parseInt(strIndex);
  const validator = IndexValidator.validate(index);

  if (validator.error) {
    res.status(400).send(validator.error.message);
  } else {
    const delivery = await getDeliveryByIndex(index);
    if (delivery) {
      res.status(200).send(delivery);
    } else {
      res.status(404).send(`Could not find delivery with index ${index}`);
    }
  }
};

export const setDelivered: HttpFunction = async (req, res) => {
  const id = req.path.split('/')[2];
  const validator = UuidValidator.validate(id);

  if (validator.error) {
    res.status(400).send(validator.error.message);
  } else {
    const delivery = await setDeliveredEntry(id);
    if (delivery) {
      res.status(200).send(delivery);
    } else {
      res.status(404).send(`Could not find delivery with id ${id}`);
    }
  }
};

export const createDelivery: HttpFunction = async (req, res) => {
  const validator = GetDeliveryRequestValidator.validate(req.body);
  if (validator.error) {
    res.status(400).send(validator.error.message);
  } else {
    const delivery = await createDeliveryEntry(req.body);
    res.status(200).send(JSON.stringify(delivery));
  }
};

export const getOptions: HttpFunction = async (req, res) => {
  const options = await getOptionsEntries();
  res.status(200).send(options);
};

export const setOptions: HttpFunction = async (req, res) => {
  const validator = SetOptionsValidator.validate(req.body);
  if (validator.error) {
    res.status(400).send(validator.error.message);
  } else {
    const options = await setOptionsEntries(req.body);
    res.status(200).send(options);
  }
};

export const handler: HttpFunction = async (req, res) => {
  switch (req.path.split('/')[1]) {
    case 'get-delivery':
      return await getDelivery(req, res);
    case 'set-delivered':
      return await setDelivered(req, res);
    case 'create-delivery':
      return await createDelivery(req, res);
    case 'get-options':
      return await getOptions(req, res);
    case 'set-options':
      return await setOptions(req, res);
    default:
      return res
        .status(400)
        .send(
          `${req.path} is not a valid path ${JSON.stringify(
            req.path.split('/'),
          )}`,
        );
  }
};

export default handler;

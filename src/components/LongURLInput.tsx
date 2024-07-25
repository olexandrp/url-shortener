import * as React from 'react';
import { TextField, CardHeader, CardContent, CardActions, Button, Card } from '@mui/material';
import UrlModel from '../data/UrlModel.ts';
import validator from 'validator';
import * as _ from 'lodash-es';

const LongURLInput: React.FC = () => {
  const [model, setModel] = React.useState(UrlModel.createRecord());
  const [modelData, setModelData] = React.useState(model.toJSON());
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setError('');
    model.set(name, value);
    setModelData(model.toJSON());
  };

  const handleClickSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const longUrl = model.get('longUrl');
      if (!longUrl) {
        setError('Long URL is required');
        return;
      }
      const isValidUrl = validator.isURL(longUrl);
      if (!isValidUrl) {
        setError('You try to shorten invalid URL');
        return;
      }
      await model.save().then((model) => {
        setModelData(model.toJSON());
      }).catch((error) => {
        setError(error.message);
      });
    } catch (error) {
      console.error("Failed to save model", error);
      setError(`Failed to save model: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickReset = async (): Promise<void> => {
    setModel(UrlModel.createRecord());
  }

  React.useEffect(() => {
    setModelData(model.toJSON());
  }, [model]);

  const disableInput = Boolean(_.get(modelData, 'shortUrl')) || isLoading;

  return (
    <>
      <Card variant="elevation" sx={{ p: 2, mb: 2 }}>
        <CardHeader title="Provide your long URL here" sx={{ p: 0, pb: 1 }} />
        <CardContent sx={{ p: 0 }}>
          <TextField
            name="longUrl"
            value={modelData.longUrl || ''}
            label="Long URL"
            error={!!error}
            helperText={error}
            disabled={disableInput}
            fullWidth
            multiline
            minRows={3}
            maxRows={10}
            onChange={handleOnChange}
          />
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "end", p: 0, pt: 2 }}>
          <Button variant="contained" onClick={handleClickSubmit} disabled={disableInput}>Shorten URL</Button>
        </CardActions>
      </Card>
      { modelData.shortUrl && (
        <Card variant="elevation" sx={{ p: 2 }}>
          <CardHeader title="Your shorten URL" sx={{ p: 0, pb: 1 }} />
          <CardContent sx={{ p: 0 }}>
            <a href={modelData.shortUrl} target="_blank">{ modelData.shortUrl }</a>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "end", p: 0, pt: 2 }}>
            <Button variant="contained" onClick={handleClickReset}>Reset</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}

export default LongURLInput;
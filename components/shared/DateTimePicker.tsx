import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { JobApplicationFormDetails } from './JobApplicationForm';
import dayjs from 'dayjs';

interface DateTimePickerComponentProps {
  formDetails: JobApplicationFormDetails;
  handleDateTimeChange : (value: dayjs.Dayjs | null | undefined, key: keyof JobApplicationFormDetails) => void;
}

export default function DateTimePickerComponent({ formDetails, handleDateTimeChange }: DateTimePickerComponentProps) {
  const minDate = dayjs(new Date())
  const maxDate = dayjs(new Date()).add(1, 'week').endOf('day')
  const minTime = dayjs(new Date()).set('hour', 9).set('minute', 0)
  const maxTime = dayjs(new Date()).set('hour', 21).set('minute', 0)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker name='interviewTime' label="Choose Date and Time for Interview" value={formDetails.interviewTime || null} 
          onChange={value => handleDateTimeChange(value, 'interviewTime')} 
          minDate={minDate}
          maxDate={maxDate}
          minTime={minTime}
          maxTime={maxTime}
          format="DD/MM/YYYY HH:mm"
          />
      </DemoContainer>
    </LocalizationProvider>
  );
}

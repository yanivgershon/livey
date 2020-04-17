import 'date-fns';
import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import './add-feed-item.css';
import {getSocialUser,setSocialUse} from '../Services/localStorageService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from 'react-i18next'

function AddFeedItem({openLoginDialog,openAddFeedDialog,handleAddFeedClose}) {

  
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedTime, handleTimeChange] = useState(new Date());
  const [duration, setDuration] = useState(new Date());
  const { t } = useTranslation()
  const handleFeedDialogClose=()=>
  {
    handleAddFeedClose(false);
  }
 const addItem=(data)=>
  {
    data.platformID=1;
    data.itemStartDateObj =selectedDate;
    fetch(`${window.baseUrl}items/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(()=>{console.log('response')
    handleFeedDialogClose();
  });
  }
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    if (window.allowPostWithoutLogin)
    {
      addItem(data);
    }
    else
    if (!getSocialUser())
    {
        openLoginDialog();
    }
    else
    {
      addItem(data);
    }
    console.log(data);
  
    //addItem(data);  /// TODO: remove this line after completing login flow!!!!!
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input
    return (
      <Dialog onClose={()=>{console.log('onclose'); handleFeedDialogClose();}} aria-labelledby="simple-dialog-title" open={openAddFeedDialog}>
      <div style={{textAlign:"right",backgroundColor:"whitesmoke",padding:20,cursor:"pointer"}} onClick={()=>handleFeedDialogClose()}>X</div>
      {/*<DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>*/}
    <div className="AddFeedItem">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formFlex">
        <div>
        <label>{t("Title")}</label>
        <input name="itemTitle" defaultValue="" ref={register} />
        <label>URL</label>
        <input name="itemURL" defaultValue="" ref={register} />
        <label>{t("Description")} </label>
        <input name="itemDescription" defaultValue="" ref={register} />
        <label>{t("Tags")}</label>
        <input name="itemTags" defaultValue="" ref={register} />
        <label>{t("Start Date")} </label>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        ref={register} 
      />
        {/*<label>StartDate</label>
        <input name="ItemStartDate" defaultValue="" ref={register} />*/}
        </div>
     
        <div style={{marginLeft:30}}>
        <label>{t("Duration")} </label>
        <InputMask name="duration" mask="99:99:99" defaultValue="01:00:00" maskChar=" " ref={register} />
        <label>{t("Owner")}</label>
        <input name="itemOwner" defaultValue="" ref={register} />
        <label>{t("Platform")} </label>
        <input name="platformID" defaultValue="" ref={register} />
        <label>{t("ImgURL")} </label>
        <input name="itemImgURL" defaultValue="" ref={register} />
        
      {/*<input
          name="exampleRequired"
          ref={register({ required: true, maxLength: 10 })}
        />*/
      }
        {errors.exampleRequired && <p>This field is required</p>}
       
        </div>
        </div>
        <input type="submit" />
      </form>
    </div>
    </Dialog>
    );
}

export default AddFeedItem;
import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import images from "@/constants/images";
import { upload_image_preview } from "@/utils/general"
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Image from 'next/image';
import { addLadderHandler, updateLadderHandler } from '@/utils/ladders';
import { BASE_URL } from '@/constants/backend-routes';




let ladderStatus = [
    { "Active": "Active" },
    { "Deactive": "Deactive" },
]

export const AddLadders = (props: any) => {
    let data = props.data?.data;
    let games: any = []
    data.forEach((elem: any) => {
        let datum: any = {};
        datum[`${elem._id}`] = elem.name;
        games.push(datum);
    });


    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <h2>Add Ladder</h2>

                <form method="post" onSubmit={addLadderHandler}>

                    <div className={dialogStyles.side_by_side}>
                        <div>
                            <Input name='name' title='Ladder Name *' required={true} />
                            <Select options={games} name='gameName' title='Game Name *' required={true} />
                            <Input name='entryFee' title='Entry Fee *' required={true} />
                            <Input name='prize' title='Prize *' required={true} />
                            <Input name='teamSize' title='Team Size *' required={true} />
                            <Input name='totalTeams' title='Total Teams *' required={true} />
                            <Select options={ladderStatus} name='status' title='Status *' required={true} />
                            <Input type='date' name='startingDate' title='Starting Date & Time *' required={true} />
                            <Input type='date' name='endingDate' title='Ending Date & Time *' required={true} />
                        </div>
                        <div className="league-photo">
                            <label>Tournament Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={images.PHOTO_PLACEHOLDER} alt="..." width={100} height={100} />
                                <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
                            </div>
                        </div>
                    </div>


                    <div className={dialogStyles.controls}>
                        <button onClick={() => { store.dispatch(hideDialog()) }} style={{ backgroundColor: "gray" }} type="button">Cancel</button>
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">Add Ladder</button>
                    </div>

                </form>

            </div>

        </div>

    )

}


export const UpdateLadders = (props: any) => {
    let ladder = props?.data?.ladder?._doc;
    let data = props?.data?.games?.data;
    let games: any = []
    data.forEach((elem: any) => {
        let datum: any = {};
        datum[`${elem._id}`] = elem.name;
        games.push(datum);
    });


    const id = ladder._id
    const [name, setName] = useState(ladder.name)
    const [gameName, setGameName] = useState(ladder.gameName?._id)
    const [entryFee, setEntryFee] = useState(ladder.entryFee)
    const [prize, setPrize] = useState(ladder.prize)
    const [teamSize, setTeamSize] = useState(ladder.teamSize)
    const [totalTeams, setTotalTeams] = useState(ladder.totalTeams)
    const [status, setStatus] = useState(ladder.status)
    const [startingDate, setStartingDate] = useState(ladder.startingDate?.substring(0, 10))
    const [endingDate, setEndingDate] = useState(ladder.endingDate?.substring(0, 10))
    const [picture, setPicture] = useState(BASE_URL + ladder.picture)

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <h2>Update Ladders</h2>

                <form method="post" onSubmit={updateLadderHandler}>

                    <input type="hidden" name="id" value={id} />

                    <div className={dialogStyles.side_by_side}>

                        <div>
                            <Input name='name' title='Ladder Name *' value={name} onChnage={(e: any) => { setName(e.target?.value) }} required={true} />
                            <Select options={games} name='gameName' value={gameName} onChnage={(e: any) => { setGameName(e.target?.value) }} title='Game Name *' required={true} />
                            <Input name='entryFee' title='Entry Fee *' value={entryFee} onChnage={(e: any) => { setEntryFee(e.target?.value) }} required={true} />
                            <Input name='prize' title='Prize *' value={prize} onChnage={(e: any) => { setPrize(e.target?.value) }} required={true} />
                            <Input name='teamSize' title='Team Size *' value={teamSize} onChnage={(e: any) => { setTeamSize(e.target?.value) }} required={true} />
                            <Input name='totalTeams' title='Total Teams *' value={totalTeams} onChnage={(e: any) => { setTotalTeams(e.target?.value) }} required={true} />
                            <Select options={ladderStatus} name='status' title='Status *' value={status} onChnage={(e: any) => { setStatus(e.target?.value) }} required={true} />
                            <Input type='date' name='startingDate' title='Starting Date & Time *' value={startingDate} onChnage={(e: any) => { setStartingDate(e.target?.value) }} required={true} />
                            <Input type='date' name='endingDate' title='Ending Date & Time *' value={endingDate} onChnage={(e: any) => { setEndingDate(e.target?.value) }} required={true} />
                        </div>

                        <div className="league-photo">
                            <label htmlFor="imageInput">Tournament Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={(ladder?.picture || picture) ? picture : images.PHOTO_PLACEHOLDER} alt="..." width={100} height={100} />
                                <input type="file" name="picture" accept="image/*" onChange={(e: any) => { e.imageViewer = setPicture; upload_image_preview(e) }} />
                            </div>
                            <input type="hidden" name="oldPicture" value={picture} />
                        </div>

                    </div>


                    <div className={dialogStyles.controls}>
                        <button style={{ backgroundColor: "gray" }} type="button">Cancel</button>
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">Update Ladder</button>
                    </div>

                </form>

            </div>

        </div>

    )

}

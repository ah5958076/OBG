import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import images from "@/constants/images";
import store from "@/Redux/store";
import { hideDialog } from "@/Redux/actions/dialogs";
import { upload_image_preview } from "@/utils/general";
import { addNewHandler, updateLeagueHanlder } from '@/utils/gpLeagues';
import Input from '@/Components/Input';
import Image from 'next/image';
import Select from '@/Components/Select';
import { BASE_URL } from '@/constants/backend-routes';





export const AddGPLeagues = (props: any) => {
    let games: any = [];
    props?.data?.data?.forEach((elem: any) => {
        let data: any = {};
        data[`${elem._id}`] = elem.name;
        games.push(data);
    })

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addNewHandler}>

                    <div className={dialogStyles.side_by_side}>
                        <div>
                            <Input title='League Name *' name='name' required={true} />
                            <Select title='Select Game *' name='gameName' required={true} options={games} />
                            <Input title='Entry Fee *' name='entryFee' required={true} />
                            <Input title='Prize *' name='prize' required={true} />
                            <Input title='Team Size *' name='teamSize' required={true} />
                            <Input title='Total Teams *' name='totalTeams' required={true} />
                            <Input type='date' title='Starting Date *' name='startingDate' required={true} />
                            <Input type='date' title='Ending Date *' name='endingDate' required={true} />
                        </div>
                        <div>
                            <label>League Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={images.PHOTO_PLACEHOLDER} alt="..." width={100} height={100} />
                                <input type="file" name="picture" accept="image/*" onChange={upload_image_preview} />
                            </div>
                        </div>
                    </div>

                    <div className={dialogStyles.controls}>
                        <button onClick={() => { store.dispatch(hideDialog()) }} style={{ backgroundColor: "gray" }} type="button">Cancel</button>
                        <button style={{ backgroundColor: "#f26826" }} type="submit">ADD LEAGUE</button>
                    </div>

                </form>

            </div>

        </div>

    )

}



export const UpdateGPLeagues = (props: any) => {

    let gpleague_data = props?.data?.gpLeagues._doc;
    let games: any = [];
    props?.data?.games?.data?.forEach((elem: any) => {
        let data: any = {};
        data[`${elem._id}`] = elem.name;
        games.push(data);
    });


    const [name, setName] = useState(gpleague_data.name);
    const [gameName, setGameName] = useState(gpleague_data.gameName?._id);
    const [entryFee, setEntryFee] = useState(gpleague_data.entryFee);
    const [prize, setPrize] = useState(gpleague_data.prize);
    const [teamSize, setTeamSize] = useState(gpleague_data.teamSize);
    const [totalTeams, setTotalTeams] = useState(gpleague_data.totalTeams);
    const [startingDate, setStartingDate] = useState(gpleague_data.startingDate);
    const [endingDate, setEndingDate] = useState(gpleague_data.endingDate);
    const [image, setImage] = useState(BASE_URL + gpleague_data.picture);
    const id = gpleague_data._id;

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateLeagueHanlder}>

                    <div className={dialogStyles.side_by_side}>
                        <div>
                            <input type="hidden" name="id" value={id} />

                            <Input name='name' title='League Name *' value={name} onChnage={(e: any) => { setName(e.target.value) }} required={true} />

                            <Select title='Select Game *' name='gameName' required={true} options={games} value={gameName} onChnage={(e: any) => setGameName(e.target.value)} />

                            <Input name='entryFee' title='Entry Fee *' value={entryFee} onChnage={(e: any) => { setEntryFee(e.target.value) }} required={true} />
                            <Input name='prize' title='Prize *' value={prize} onChnage={(e: any) => { setPrize(e.target.value) }} required={true} />
                            <Input name='teamSize' title='Team Size *' value={teamSize} onChnage={(e: any) => { setTeamSize(e.target.value) }} required={true} />
                            <Input name='totalTeams' title='Total Teams *' value={totalTeams} onChnage={(e: any) => { setTotalTeams(e.target.value) }} required={true} />
                            <Input type='date' name='startingDate' title='Starting Date *' value={startingDate.substring(0, 10)} onChnage={(e: any) => { setStartingDate(e.target.value) }} required={true} />
                            <Input type='date' name='endingDate' title='Ending Date *' value={endingDate.substring(0, 10)} onChnage={(e: any) => { setEndingDate(e.target.value) }} required={true} />
                        </div>

                        <div>
                            <label>League Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={image ? image : images.PHOTO_PLACEHOLDER} alt="..." width={100} height={100} />
                                <input type="file" name="picture" accept="image/*" onChange={(e: any) => { e.imageViewer = setImage; upload_image_preview(e) }} />
                            </div>
                            <input type="hidden" name="old_picture" value={image} required />
                        </div>
                    </div>


                    <div className={dialogStyles.controls}>
                        <button onClick={() => store.dispatch(hideDialog())} style={{ backgroundColor: "gray" }} type="button">Cancel</button>
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">UPDATE LEAGUE</button>
                    </div>

                </form>

            </div>

        </div>

    )

}
import React, {useState} from "react";
import {View, StyleSheet, TextInput, Alert} from "react-native"
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import AppCommentList from "../AppCommentList";
import {getRandomKey, MASTER, SHADOW} from "../../../global";
import {AppTextBold} from "../AppTextBold";
import AppRatingVote from "../sortDetailPageScreen/AppRatingVote";
import AppRating from "../sortDetailPageScreen/AppRating";
import {AppFetch} from "../../AppFetch";
import {useDispatch} from "react-redux";
import {getComments} from "../../store/actions/comments";
import {AppBlueButton} from "../AppBlueButton";
import {globalAlert} from "../../globalHeaders";

export default
    ({
        comments,
        votes,
        screenWidth,
        id,
        type,
        counts,
        navigation
    }) => {
    const [tab, setTab] = useState(1)
    const [selected, setSelected] = useState([])
    const [comment, setComment] = useState("")
    const active = "#fff"
    const notActive = "#000"
    const dispatch = useDispatch()

    const addOrRemove = (data) => {
        const arr = selected
        let found = false
        for(let i in arr) {
            if(arr[i].id == data.id) {
                arr.splice(i, 1)
                arr.push(data)
                found = true
            }
        }

        if(!found) {
            arr.push(data)
        }

        setSelected(arr)
    }

   const ratingFun = (id) => {
        //console.log(selected, id)
        let res = 0
       const arr = selected
       for(let i in arr) {
           if(arr[i].id == id) {
                res = arr[i].value
           }
       }

       return res
   }

    const sendComment = async () => {
        if(comment.length == 0) {
            Alert.alert(
                'Вы не ввели комментарий',
                '',
                [
                    { text: 'Ясно', onPress: () => console.log('OK Pressed') }
                ],
            );
        } else if(comment.length < 5) {
            Alert.alert(
                'Ваш комментарий слишком короткий',
                '',
                [
                    { text: 'Ясно', onPress: () => console.log('OK Pressed') }
                ],
            );
        } else {
            const sender = new FormData
            sender.append('id', id)
            sender.append('type', type)
            sender.append('comment', comment)
            sender.append('rating', JSON.stringify(selected))

            //console.log('JSON.stringify(selected)', JSON.stringify(selected))

            const response = await AppFetch.postWithToken('sendComment', sender, {}, {}, navigation)
            if(response.result) {
                dispatch(getComments({id, type, navigation})).then(resp => {
                    setSelected([])
                    setComment("")
                    setTab(1)
                })
                globalAlert({
                    title: "Отзыв был успешно отправлен на модерацию"
                })
            }
        }
    }

    const TitleText = () => {
        switch(type) {
            case MASTER:
                return "Оцените услуги мастера"
            default:
                return "Поставьте свою оценку"
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <AppButton color={
                    (tab == 1) ? THEME.FOOTER_BG : "#fff"
                } style={
                    styles.btn
                } onPress={() => {
                    setTab(1)
                }}>
                    <AppTextBold style={{...styles.btnText, color: (tab == 1) ? active : notActive}}>
                        Отзывы ({counts})
                    </AppTextBold>
                </AppButton>
                <AppButton color={
                    (tab == 2) ? THEME.FOOTER_BG : "#fff"
                } style={
                    styles.btn
                } textColor={
                    (tab == 2) ? active : notActive
                } onPress={() => {
                    setTab(2)
                }}>
                    <AppTextBold style={{...styles.btnText, color: (tab == 2) ? active : notActive}}>
                        Написать отзыв
                    </AppTextBold>
                </AppButton>
            </View>
            {
                tab == 1
                    ?
                    comments.map(item => {
                        return <AppCommentList
                            key={getRandomKey()}
                            screenWidth={screenWidth}
                            data={item}
                        />
                    })
                    :
                    <>
                        <View style={styles.commentWrap}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder={"Напишите комментарий"}
                                multiline={true}
                                textAlignVertical={"top"}
                                onChangeText={text => {
                                    setComment(text)
                                }}
                            />
                            {/*<AppButton*/}
                            {/*    color={THEME.FOOTER_BG}*/}
                            {/*    style={styles.sendInput}*/}
                            {/*    onPress={() => {*/}
                            {/*        sendComment().then(resp => {})*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <AppText style={{marginRight: 10, marginTop: 0, marginBottom: 0}}>*/}
                            {/*        Отправить комментарий*/}
                            {/*    </AppText>*/}
                            {/*    <View style={{width: 10}}></View>*/}
                            {/*    <Svg*/}
                            {/*        width={15}*/}
                            {/*        height={15}*/}
                            {/*        viewBox="0 0 512 512"*/}
                            {/*        fill={"#fff"}*/}
                            {/*    >*/}
                            {/*        <Path d="M440,256H424a8,8,0,0,0-8,8V464a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V112A16,16,0,0,1,48,96H248a8,8,0,0,0,8-8V72a8,8,0,0,0-8-8H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V264A8,8,0,0,0,440,256ZM500,0,364,.34a12,12,0,0,0-12,12v10a12,12,0,0,0,12,12L454,34l.7.71L131.51,357.86a12,12,0,0,0,0,17l5.66,5.66a12,12,0,0,0,17,0L477.29,57.34l.71.7-.34,90a12,12,0,0,0,12,12h10a12,12,0,0,0,12-12L512,12A12,12,0,0,0,500,0Z"></Path>*/}
                            {/*    </Svg>*/}
                            {/*</AppButton>*/}
                        </View>
                        <AppRating style={styles.voteWrap}>
                            <AppTextBold style={{width: "100%", marginBottom: 10, textAlign: "center"}}>
                                {TitleText()}
                            </AppTextBold>
                            {
                                votes.map(item => {
                                    //console.log(item.name, ratingFun(item.id))
                                    return <AppRatingVote
                                        style={styles.vote}
                                        key={getRandomKey()}
                                        text={item.name}
                                        //outside={true}
                                        rating={ratingFun(item.id)}
                                        initiate={ratingFun(item.id)}
                                        onResult={result => {
                                            addOrRemove({
                                                id: item.id,
                                                value: result
                                            })
                                        }}
                                        starWidth={24}
                                        starHeight={24}
                                    />
                                })
                            }
                        </AppRating>
                        <AppBlueButton
                            style={styles.btnSend}
                            onPress={() => {
                                sendComment().then(resp => {})
                            }}
                        >
                            Отправить
                        </AppBlueButton>
                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btnSend: {
        width: 170,
        marginLeft: "auto",
        marginRight: "auto"
    },
    sendInput: {
        width: 280,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {

    },
    tabs: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    },
    commentWrap: {
        position: "relative",
        paddingLeft: 20,
        paddingRight: 20
    },
    commentInput: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 100,
        padding: 10,
        backgroundColor: "#fff",
        ...SHADOW
    },
    btnText: {
        marginTop: 0,
        marginBottom: 0
    },
    btn: {
        width: "50%",
        paddingTop: 5,
        paddingBottom: 5
    },
    voteWrap: {
        // flexDirection: "row",
        // flexWrap: "wrap"
    },
    vote: {
        width: 250,
        flexWrap: "wrap",
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: "auto",
        marginRight: "auto"
    }
})
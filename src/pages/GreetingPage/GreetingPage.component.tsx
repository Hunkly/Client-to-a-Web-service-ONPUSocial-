import React, {useEffect, useState} from 'react';
import GreetingPageStyled from './GreetingPage.styled';
import Button from '../../shared/components/Button';
import pathHistory from "../../pathHistory";
import {checkAuthentication, ICurrent, LocalStorage} from "../../actions/current";
import axios from "axios";
import {connect} from "react-redux";

interface IProps {
    isAuthenticated: boolean | null;
}

function GreetingPage({isAuthenticated}: IProps){
    let auth: LocalStorage = JSON.parse(localStorage.getItem('state') || '{}');
    const [logged, setLogged] = useState(auth.authenticated);
    const [login, setLogin] = useState(auth.login);
    // const [file, setFile] = useState('');

    // function onFileChange(file: File){
    //         let formData = new FormData();
    //         formData.append('file', file, file.name);
    //         formData.append('login', "login");
    //         console.log('formData', formData);
    //         console.log('file', file);
    //         axios({
    //             method: "post",
    //             url: `http://localhost:9005/files/upload`,
    //             data: formData,
    //             withCredentials: true,
    //             headers: {
    //                 "Access-Control-Allow-Credentials": true,
    //                 "Access-Control-Allow-Origin": 'http://localhost:3000',
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'x-www-form-urlencoded',
    //                 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //             }
    //         }).then(res => {
    //             console.log('RES FILE', res);
    //         }).catch(err => {
    //             console.log('ERR FILE', err);
    //         })
    //     // }
    // }
    //
    // function downloadImage(){
    //     axios({
    //         method: "get",
    //         url: `http://localhost:9005/files/downloadasfile?fileName=1loginCV.jpg&login=login`,
    //         withCredentials: true,
    //         headers: {
    //             "Access-Control-Allow-Credentials": true,
    //             "Access-Control-Allow-Origin": 'http://localhost:3000',
    //             'Content-Type': 'image/jpeg',
    //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //         }
    //     }).then(res => {
    //         console.log('RES DOWNLOAD FILE', res);
    //         console.log('DATA', res.data);
    //         setFile(res.data);
    //     }).catch(err => {
    //         console.log('ERR DOWNLOAD FILE', err);
    //     })
    // }

    useEffect(
        () => {
            checkAuthentication();
            axios({
                method: "get",
                url: `http://localhost:9005/authuser`,
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
                .then(res => {
                    console.log(res);
                    setLogin(res.data.username);
                    setLogged(true);
                })
                .catch(error => {
                    console.log(error);
                    setLogged(false);
                });
        },[isAuthenticated]
    );

    // @ts-ignore
    return(
        <GreetingPageStyled active_color='red'>
            <div className="greeting-page__container">
                <div className = "greeting-page__title">ONPU Social</div>
                { logged ?
                    <div>
                        <div className = "greeting-page__text">
                            We glad to see you here, {login}. Let's begin.
                        </div>
                        <div className= "greeting-page__button-container">
                            <Button
                                onClick={() => {pathHistory.push(`/users/${login}`)}}
                                value={`/users/${login}`}
                                color="#3E76BB"
                                activeColor="#3E76BB"
                            >
                                My profile
                            </Button>
                        </div>
                    </div>
                    :
                    <div className="greeting-page__button-container">
                        {/*<input type="file" onChange={ (event) => { if(event.target.files) onFileChange(event.target.files[0]); } }/>*/}
                        {/*<Button*/}
                        {/*    onClick={downloadImage}*/}
                        {/*    color="#3E76BB"*/}
                        {/*    activeColor="#3E76BB"*/}
                        {/*>*/}
                        {/*    Загрузить изображение*/}
                        {/*</Button>*/}
                        <Button
                            onClick={() => {pathHistory.push('/auth/login')}}
                            value="/auth/login"
                            color="#3E76BB"
                            activeColor="#3E76BB"
                        >
                            Sign in
                        </Button>
                        <Button
                            onClick={() => {pathHistory.push('/auth/registration')}}
                            value="/auth/registration"
                            color="#FB4141"
                            activeColor="#FB4141"
                        >
                            Sign Up
                        </Button>
                    </div>
                }
            </div>
        </GreetingPageStyled>
    )
}

const mapStateToProps = (state: ICurrent) => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(
    mapStateToProps,
    {},
)(GreetingPage);

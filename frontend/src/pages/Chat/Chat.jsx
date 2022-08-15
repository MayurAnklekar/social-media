import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import ChatCard from '../../components/ChatCard/ChatCard';
import Messenger from '../../components/Messenger/Messenger';
import {fetchChatsService} from '../../services/messageServices'
import { fetchUsersService } from '../../services/userServices';
import './chat.css';

const Chat = () => {
	const {
		user: { id },
	} = useSelector(state => state);

	const [chats, setChat] = useState([])

	useEffect(()=>{

		const fetchChats = async () => {
			const data = await fetchChatsService();
			data.chats.map(ch=>{
				const d = ch.members.filter(_id=>_id!==id)
				const fetchUser = async () => {
					const user = await fetchUsersService({"id":d[0]})
					return {
						...ch,
						userDetails: user.user
					}
				}
				fetchUser().then(res=>{
					setChat(prev=>{
						return [...prev, res]
					})
				})
				
			})
		}
		
		fetchChats()
		

	},[])

	return (
		<main className='chat__page'>
			<section className='chat__page__cards'>
				{chats.map(chat => (
					<ChatCard chat={chat} key={chat._id} />
				))}
			</section>
			<Messenger chats={chats}/>
		</main>
	);
};

export default Chat;

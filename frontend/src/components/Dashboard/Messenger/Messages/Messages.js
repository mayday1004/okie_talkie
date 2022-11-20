import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import MessagesHeader from './MessagesHeader';
import Message from './Message';
import convertDateToHumanReadable from '../../../../utils/dateSwitch';
import DateSeparator from './DateSeparator';

const Messages = () => {
  const messages = useSelector(state => state.chat.messages);

  return (
    <MainContainer>
      <MessagesHeader />
      {messages.map((message, index) => {
        const sameAuthor = index > 0 && messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(message.date), 'dd/mm/yy') ===
            convertDateToHumanReadable(new Date(messages[index - 1].date), 'dd/mm/yy');

        return (
          <div key={message._id} style={{ width: '97%' }}>
            {(!sameDay || index === 0) && (
              <DateSeparator date={convertDateToHumanReadable(new Date(message.date), 'dd/mm/yy')} />
            )}
            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToHumanReadable(new Date(message.date), 'dd/mm/yy')}
              sameDay={sameDay}
              image={message.author.image}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

export default Messages;

const MainContainer = styled('div')({
  height: '100%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

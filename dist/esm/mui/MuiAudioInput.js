import { Button, makeStyles } from '@material-ui/core';
import { Send as SendIcon, Stop as StopIcon } from '@material-ui/icons';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import React from 'react';
import { AudioMediaRecorder } from '../audio-media-recorder';
const useStyles = makeStyles(theme => ({
  container: {
    flex: '1 1 auto',
    display: 'flex',
    '& > *': {
      flex: '1 1 auto',
      minWidth: 0
    },
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  }
}));
export function MuiAudioInput({
  chatController,
  actionRequest
}) {
  const classes = useStyles();
  const chatCtl = chatController;
  const [audioRec] = React.useState(AudioMediaRecorder.getInstance());
  const [stopped, setStopped] = React.useState(true);
  const [audio, setAudio] = React.useState();
  const handleError = React.useCallback(error => {
    const value = {
      type: 'audio',
      value: error.message,
      error
    };
    chatCtl.setActionResponse(actionRequest, value);
  }, [actionRequest, chatCtl]);
  const handleStart = React.useCallback(async () => {
    try {
      await audioRec.initialize();
      await audioRec.startRecord();
      setStopped(false);
    } catch (error) {
      handleError(error);
    }
  }, [audioRec, handleError]);
  const handleStop = React.useCallback(async () => {
    try {
      const a = await audioRec.stopRecord();
      setAudio(a);
      setStopped(true);
    } catch (error) {
      handleError(error);
    }
  }, [audioRec, handleError]);
  const sendResponse = React.useCallback(() => {
    if (audio) {
      const value = {
        type: 'audio',
        value: 'Audio',
        audio
      };
      chatCtl.setActionResponse(actionRequest, value);
      setAudio(undefined);
    }
  }, [actionRequest, audio, chatCtl]);
  const sendButtonText = actionRequest.sendButtonText ? actionRequest.sendButtonText : 'Send';
  return /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, stopped && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: handleStart,
    disabled: !stopped,
    variant: "contained",
    color: "primary",
    startIcon: /*#__PURE__*/React.createElement(KeyboardVoiceIcon, null)
  }, "Rec start"), !stopped && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: handleStop,
    disabled: stopped,
    variant: "contained",
    color: "primary",
    startIcon: /*#__PURE__*/React.createElement(StopIcon, null)
  }, "Rec stop"), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: sendResponse,
    disabled: !audio,
    variant: "contained",
    color: "primary",
    startIcon: /*#__PURE__*/React.createElement(SendIcon, null)
  }, sendButtonText));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tdWkvTXVpQXVkaW9JbnB1dC50c3giXSwibmFtZXMiOlsiQnV0dG9uIiwibWFrZVN0eWxlcyIsIlNlbmQiLCJTZW5kSWNvbiIsIlN0b3AiLCJTdG9wSWNvbiIsIktleWJvYXJkVm9pY2VJY29uIiwiUmVhY3QiLCJBdWRpb01lZGlhUmVjb3JkZXIiLCJ1c2VTdHlsZXMiLCJ0aGVtZSIsImNvbnRhaW5lciIsImZsZXgiLCJkaXNwbGF5IiwibWluV2lkdGgiLCJtYXJnaW5MZWZ0Iiwic3BhY2luZyIsIk11aUF1ZGlvSW5wdXQiLCJjaGF0Q29udHJvbGxlciIsImFjdGlvblJlcXVlc3QiLCJjbGFzc2VzIiwiY2hhdEN0bCIsImF1ZGlvUmVjIiwidXNlU3RhdGUiLCJnZXRJbnN0YW5jZSIsInN0b3BwZWQiLCJzZXRTdG9wcGVkIiwiYXVkaW8iLCJzZXRBdWRpbyIsImhhbmRsZUVycm9yIiwidXNlQ2FsbGJhY2siLCJlcnJvciIsInZhbHVlIiwidHlwZSIsIm1lc3NhZ2UiLCJzZXRBY3Rpb25SZXNwb25zZSIsImhhbmRsZVN0YXJ0IiwiaW5pdGlhbGl6ZSIsInN0YXJ0UmVjb3JkIiwiaGFuZGxlU3RvcCIsImEiLCJzdG9wUmVjb3JkIiwic2VuZFJlc3BvbnNlIiwidW5kZWZpbmVkIiwic2VuZEJ1dHRvblRleHQiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLE1BQVQsRUFBd0JDLFVBQXhCLFFBQTBDLG1CQUExQztBQUNBLFNBQVNDLElBQUksSUFBSUMsUUFBakIsRUFBMkJDLElBQUksSUFBSUMsUUFBbkMsUUFBbUQsb0JBQW5EO0FBQ0EsT0FBT0MsaUJBQVAsTUFBOEIsa0NBQTlCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUVBLFNBQVNDLGtCQUFULFFBQW1DLHlCQUFuQztBQUlBLE1BQU1DLFNBQVMsR0FBR1IsVUFBVSxDQUFFUyxLQUFELEtBQW1CO0FBQzlDQyxFQUFBQSxTQUFTLEVBQUU7QUFDVEMsSUFBQUEsSUFBSSxFQUFF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ekIsYUFBYSxDQUFDeUIsY0FESyxHQUVuQixNQUZKO0FBSUEsc0JBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBRXhCLE9BQU8sQ0FBQ1Q7QUFBeEIsS0FDR2MsT0FBTyxpQkFDTixvQkFBQyxNQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLElBQUEsT0FBTyxFQUFFVyxXQUZYO0FBR0UsSUFBQSxRQUFRLEVBQUUsQ0FBQ1gsT0FIYjtBQUlFLElBQUEsT0FBTyxFQUFDLFdBSlY7QUFLRSxJQUFBLEtBQUssRUFBQyxTQUxSO0FBTUUsSUFBQSxTQUFTLGVBQUUsb0JBQUMsaUJBQUQ7QUFOYixpQkFGSixFQWFHLENBQUNBLE9BQUQsaUJBQ0Msb0JBQUMsTUFBRDtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLE9BQU8sRUFBRWMsVUFGWDtBQUdFLElBQUEsUUFBUSxFQUFFZCxPQUhaO0FBSUUsSUFBQSxPQUFPLEVBQUMsV0FKVjtBQUtFLElBQUEsS0FBSyxFQUFDLFNBTFI7QUFNRSxJQUFBLFNBQVMsZUFBRSxvQkFBQyxRQUFEO0FBTmIsZ0JBZEosZUF5QkUsb0JBQUMsTUFBRDtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLE9BQU8sRUFBRWlCLFlBRlg7QUFHRSxJQUFBLFFBQVEsRUFBRSxDQUFDZixLQUhiO0FBSUUsSUFBQSxPQUFPLEVBQUMsV0FKVjtBQUtFLElBQUEsS0FBSyxFQUFDLFNBTFI7QUFNRSxJQUFBLFNBQVMsZUFBRSxvQkFBQyxRQUFEO0FBTmIsS0FRR2lCLGNBUkgsQ0F6QkYsQ0FERjtBQXNDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbiwgVGhlbWUsIG1ha2VTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSc7XG5pbXBvcnQgeyBTZW5kIGFzIFNlbmRJY29uLCBTdG9wIGFzIFN0b3BJY29uIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zJztcbmltcG9ydCBLZXlib2FyZFZvaWNlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvS2V5Ym9hcmRWb2ljZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBBdWRpb01lZGlhUmVjb3JkZXIgfSBmcm9tICcuLi9hdWRpby1tZWRpYS1yZWNvcmRlcic7XG5pbXBvcnQgeyBDaGF0Q29udHJvbGxlciB9IGZyb20gJy4uL2NoYXQtY29udHJvbGxlcic7XG5pbXBvcnQgeyBBdWRpb0FjdGlvblJlcXVlc3QsIEF1ZGlvQWN0aW9uUmVzcG9uc2UgfSBmcm9tICcuLi9jaGF0LXR5cGVzJztcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcygodGhlbWU6IFRoZW1lKSA9PiAoe1xuICBjb250YWluZXI6IHtcbiAgICBmbGV4OiAnMSAxIGF1dG8nLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAnJiA+IConOiB7XG4gICAgICBmbGV4OiAnMSAxIGF1dG8nLFxuICAgICAgbWluV2lkdGg6IDAsXG4gICAgfSxcbiAgICAnJiA+ICogKyAqJzoge1xuICAgICAgbWFyZ2luTGVmdDogdGhlbWUuc3BhY2luZygxKSxcbiAgICB9LFxuICB9LFxufSkpO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpQXVkaW9JbnB1dCh7XG4gIGNoYXRDb250cm9sbGVyLFxuICBhY3Rpb25SZXF1ZXN0LFxufToge1xuICBjaGF0Q29udHJvbGxlcjogQ2hhdENvbnRyb2xsZXI7XG4gIGFjdGlvblJlcXVlc3Q6IEF1ZGlvQWN0aW9uUmVxdWVzdDtcbn0pOiBSZWFjdC5SZWFjdEVsZW1lbnQge1xuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gIGNvbnN0IGNoYXRDdGwgPSBjaGF0Q29udHJvbGxlcjtcbiAgY29uc3QgW2F1ZGlvUmVjXSA9IFJlYWN0LnVzZVN0YXRlKEF1ZGlvTWVkaWFSZWNvcmRlci5nZXRJbnN0YW5jZSgpKTtcbiAgY29uc3QgW3N0b3BwZWQsIHNldFN0b3BwZWRdID0gUmVhY3QudXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFthdWRpbywgc2V0QXVkaW9dID0gUmVhY3QudXNlU3RhdGU8QmxvYiB8IHVuZGVmaW5lZD4oKTtcblxuICBjb25zdCBoYW5kbGVFcnJvciA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChlcnJvcjogRXJyb3IpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlOiBBdWRpb0FjdGlvblJlc3BvbnNlID0ge1xuICAgICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgICB2YWx1ZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICB9O1xuICAgICAgY2hhdEN0bC5zZXRBY3Rpb25SZXNwb25zZShhY3Rpb25SZXF1ZXN0LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBbYWN0aW9uUmVxdWVzdCwgY2hhdEN0bF0sXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU3RhcnQgPSBSZWFjdC51c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGF1ZGlvUmVjLmluaXRpYWxpemUoKTtcbiAgICAgIGF3YWl0IGF1ZGlvUmVjLnN0YXJ0UmVjb3JkKCk7XG4gICAgICBzZXRTdG9wcGVkKGZhbHNlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfSwgW2F1ZGlvUmVjLCBoYW5kbGVFcnJvcl0pO1xuXG4gIGNvbnN0IGhhbmRsZVN0b3AgPSBSZWFjdC51c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGEgPSBhd2FpdCBhdWRpb1JlYy5zdG9wUmVjb3JkKCk7XG4gICAgICBzZXRBdWRpbyhhKTtcbiAgICAgIHNldFN0b3BwZWQodHJ1ZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGhhbmRsZUVycm9yKGVycm9yKTtcbiAgICB9XG4gIH0sIFthdWRpb1JlYywgaGFuZGxlRXJyb3JdKTtcblxuICBjb25zdCBzZW5kUmVzcG9uc2UgPSBSZWFjdC51c2VDYWxsYmFjaygoKTogdm9pZCA9PiB7XG4gICAgaWYgKGF1ZGlvKSB7XG4gICAgICBjb25zdCB2YWx1ZTogQXVkaW9BY3Rpb25SZXNwb25zZSA9IHtcbiAgICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgICAgdmFsdWU6ICdBdWRpbycsXG4gICAgICAgIGF1ZGlvLFxuICAgICAgfTtcbiAgICAgIGNoYXRDdGwuc2V0QWN0aW9uUmVzcG9uc2UoYWN0aW9uUmVxdWVzdCwgdmFsdWUpO1xuICAgICAgc2V0QXVkaW8odW5kZWZpbmVkKTtcbiAgICB9XG4gIH0sIFthY3Rpb25SZXF1ZXN0LCBhdWRpbywgY2hhdEN0bF0pO1xuXG4gIGNvbnN0IHNlbmRCdXR0b25UZXh0ID0gYWN0aW9uUmVxdWVzdC5zZW5kQnV0dG9uVGV4dFxuICAgID8gYWN0aW9uUmVxdWVzdC5zZW5kQnV0dG9uVGV4dFxuICAgIDogJ1NlbmQnO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuY29udGFpbmVyfT5cbiAgICAgIHtzdG9wcGVkICYmIChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVN0YXJ0fVxuICAgICAgICAgIGRpc2FibGVkPXshc3RvcHBlZH1cbiAgICAgICAgICB2YXJpYW50PVwiY29udGFpbmVkXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHN0YXJ0SWNvbj17PEtleWJvYXJkVm9pY2VJY29uIC8+fVxuICAgICAgICA+XG4gICAgICAgICAgUmVjIHN0YXJ0XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKX1cbiAgICAgIHshc3RvcHBlZCAmJiAoXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTdG9wfVxuICAgICAgICAgIGRpc2FibGVkPXtzdG9wcGVkfVxuICAgICAgICAgIHZhcmlhbnQ9XCJjb250YWluZWRcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgc3RhcnRJY29uPXs8U3RvcEljb24gLz59XG4gICAgICAgID5cbiAgICAgICAgICBSZWMgc3RvcFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICl9XG4gICAgICA8QnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXtzZW5kUmVzcG9uc2V9XG4gICAgICAgIGRpc2FibGVkPXshYXVkaW99XG4gICAgICAgIHZhcmlhbnQ9XCJjb250YWluZWRcIlxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBzdGFydEljb249ezxTZW5kSWNvbiAvPn1cbiAgICAgID5cbiAgICAgICAge3NlbmRCdXR0b25UZXh0fVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXX0=
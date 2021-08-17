import React from 'react';

const customBtn = {
    color: 'white',
    background: 'linear-gradient(93.06deg, #5943E4 11.12%, #FF5F5F 61.32%, #5943E4 128.65%)',
    borderRadius: 16,
    fontSize: 14,
    fontWeight: 400,
    cursor: "pointer",
    padding: "7px 30px",
};
const customBtnDisabled = {
    color: 'white',
    background: 'linear-gradient(93.06deg, #5943E4 11.12%, #FF5F5F 61.32%, #5943E4 128.65%)',
    borderRadius: 16,
    fontSize: 14,
    fontWeight: 400,
    padding: "7px 30px",
    opacity: "0.7",
};

interface StateFromProps { }
interface DispatchFromProps {
    onClick: any;
    text: string;
    disabled: boolean;
}
type Props = StateFromProps & DispatchFromProps;

const CustomBtn: React.FC<Props> = ({ onClick, text, disabled }: Props) => {
    return (<div style={disabled ? customBtnDisabled : customBtn}
        onClick={disabled ? null : onClick} >{text}</div>);
}
export default CustomBtn;

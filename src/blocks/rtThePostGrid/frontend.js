import RenderView from "./renderView";
import {
    Titlea,
    Titletag,
    Excerpts,
    Cat_style,
    MetaStyle,
    Button_style,
    Btn_align,
    Head_title,
    Head_color,
    Head_border,
    Head_border_style1,
    MetaStyle_align,
    Content_wrap,
    Content_padding,
} from './Style_component';

const {render, useState, useEffect} = wp.element;
import apiFetch from '@wordpress/api-fetch';

const RtThePostGrid = (props) => {
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(props.limit || 10);
    useEffect(() => {
        apiFetch({path: '/rt/v1/query?post_type=post'}).then((posts) => {
            setData(posts);
        });
    }, [perPage]);

    const style_sheet ={
        Titlea,
        Titletag,
        Excerpts,
        Cat_style,
        MetaStyle,
        Button_style,
        Btn_align,
        Head_title,
        Head_color,
        Head_border,
        Head_border_style1,
        MetaStyle_align,
        Content_wrap,
        Content_padding,
    }


    return (
        <div className="rt-thepostgrid-frontend">
            <RenderView {...props} data={data} css={style_sheet}/>
        </div>
    )
}

const divsToUpdate = document.querySelectorAll(".rt-thepostgrid")

divsToUpdate.forEach(div => {
    const data = JSON.parse(div.querySelector("pre").innerText)
    render(<RtThePostGrid {...data} />, div)
    div.classList.remove("rt-radius-blocks-ph")
})

import {
    Excerpts,
    Button_style,
    Btn_align,
    Head_title,
    Head_color,
    Head_border,
    Head_border_style1,
    MetaStyle_align,
    Content_wrap,
    Content_padding,
    Dot_style, ImgCol, ContentCol, Colgut
} from "../../Style_component";
import { trimbychar, trimbyword } from './../../Helper';
import {Titles} from "../elements/Titles";
import {Image} from "../elements/Image";
import {Author} from "../elements/Author";
import {Date} from "../elements/Date";
import {CommentCount} from "../elements/CommentCount";
import {Category_Default, Non_Category_Default} from "../elements/Category";
import {Tags} from "../elements/Tags";

export const List1 = (props) =>{
    const {
        title,
        title_style,
        data,
        excerpt,
        excerpt_style,
        category,
        category_style,
        category_padding,
        category_margin,
        meta,
        meta_style,
        button,
        button_style,
        button_padding,
        button_margin,
        general,
        heading,
        heading_style,
        heading_title,
        heading_padding_object,
        heading_margin_object,
        content_wrap,
        constent_box_padding,
        content_padding,
        image,
        primary_color,
        loaders,
        columns,
        linking,
        layout,
        heading_dot_margin,
        className
    } = props


    let Heading = "";
    let Title = "";
    if (heading.tag === undefined) {
        Heading = 'h2'
    } else {
        Heading = 'h' + heading.tag
    }

    if (title.tag === undefined) {
        Title = 'h2'
    } else {
        Title = 'h' + title.tag
    }
    const htmltotextconvert = (excerpt) =>{
        var txt = document.createElement("textarea");
        txt.innerHTML = excerpt;
        return txt.value;
    }

    return(
        <>
            <div className={`${(className != undefined)? className: ""} rt-container-fluid rt-tpg-container`}>
                {
                    general.heading?(
                        <Head_border css={heading_style} css_head={heading} className={`tpg-widget-heading-wrapper heading-style${heading.style} ${heading_style['text-align']}`}>

                            {
                                (heading.style == "1") ? (<Head_border_style1 css={heading_style} className="tpg-widget-heading-line line-left"></Head_border_style1>) : ("")
                            }
                            <Head_title css={heading_style} head_sty={heading} primary={primary_color} css_pad={heading_padding_object} css_mar={heading_margin_object} as={Heading} className="tpg-widgets-heading">
                                <Head_color as={(heading.link.length > 0)? 'a': 'span'} css={heading_style} primary={primary_color} href={heading.link}>{heading_title}</Head_color>
                            </Head_title>
                            <Dot_style css={heading_style} css_mar={heading_dot_margin} className="heading_dot"></Dot_style>
                            {
                                (heading.style == "1") ? (<Head_border_style1 css={heading_style} className="tpg-widget-heading-line"></Head_border_style1>) : ("")
                            }

                        </Head_border>
                    ):("")
                }
                <div className={`rt-row rt-content-loader layout2 list1 layout_parent tpg-even`}>
                    {
                        data.length && data.map((post) => {
                            var postexcerpt = (excerpt.type == "fullex")? post.excerpt : post.content;
                            var post_title = post.title;

                            if (title.type == "char") {
                                post_title = trimbychar(post_title, title.word_limit, title.more_text)
                            }

                            if (title.type == "word") {
                                post_title = trimbyword(post_title, title.word_limit, title.more_text)
                            }

                            if (excerpt.type == "char") {
                                postexcerpt = trimbychar(postexcerpt, excerpt.limit, excerpt.more_text)
                            }

                            if (excerpt.type == "word") {
                                postexcerpt = trimbyword(postexcerpt, excerpt.limit, excerpt.more_text)
                            }


                            // Title
                            const title_props = {
                                Title,
                                title_style,
                                primary_color,
                                id: post.id,
                                target: linking.target,
                                link: post.post_link,
                                post_title
                            }
                            const image_props = {
                                id: post.id,
                                link: post.post_link,
                                target: linking.target,
                                image,
                                image_url: post.image_url,
                                layout: layout.value,
                                loaders: loaders.image
                            }
                            const author_props = {
                                meta,
                                author_url: post.author_url,
                                meta_style,
                                primary_color,
                                name: post.author_name
                            }
                            const date_props = {meta, meta_style, primary_color, date: post.post_date}
                            const comment_count_props = {
                                meta,
                                meta_style,
                                primary_color,
                                count: post.comment_count,
                                link: post.post_link
                            }
                            const category_props = {
                                meta,
                                meta_style,
                                primary_color,
                                category,
                                post_terms: post?.terms,
                                category_style,
                                category_padding,
                                category_margin
                            }

                            return(
                                <>
                                    <Colgut css={content_wrap} className={`rt-col-md-${columns.desktop} rt-col-sm-${(columns.tablet == "24")? "2":columns.tablet} rt-col-xs-${(columns.mobile == "24")? "2":columns.mobile} list_layout one even-grid-item ${image.animation}`} data-id={post.id}>
                                        <Content_wrap css={content_wrap} css_pad={constent_box_padding} className="rt-holder">
                                            <div className={`rt-row`}>
                                                {
                                                    image.show_hide?(
                                                        <ImgCol css={image} className={`rt-col-sm-${(image['img-column'])? image['img-column']: ''} rt-col-xs-12 `}>
                                                            <div className={`rt-img-holder ${loaders.image? "show_loader": ""}`}>
                                                                {
                                                                    image.show_hide?(
                                                                        <Image data={image_props}/>
                                                                    ):("")
                                                                }

                                                                {
                                                                    (category.position.includes('over-image')) ? (
                                                                        <div className={`cat-${category.position} ${category.style}`}>
                                                                            <Non_Category_Default data={category_props}/>
                                                                        </div>
                                                                    ) : ("")
                                                                }
                                                            </div>
                                                        </ImgCol>
                                                    ):("")
                                                }
                                                <ContentCol css={image} className={`rt-col-sm-${(!image.show_hide)? "12":((image['content-column'])? image['content-column']: '')} rt-col-xs-12 `}>
                                                    <Content_padding css_pad={content_padding} className="rt-detail">
                                                        {
                                                            (category.position == "above-title") ? (
                                                                <div className={`cat-above-title ${category.style}`}>
                                                                    <Non_Category_Default data={category_props}/>
                                                                </div>
                                                            ) : ('')
                                                        }

                                                        {
                                                            (meta.position == "above") ? (
                                                                <MetaStyle_align css={meta_style} className="post-meta-user  ">


                                                                    {/*Post date*/}
                                                                    {
                                                                        general.post_date ? (
                                                                            <Date data={date_props}/>
                                                                        ) : ('')
                                                                    }
                                                                    {/*Author*/}
                                                                    {
                                                                        general.author ? (
                                                                            <Author data={author_props}/>
                                                                        ) : ("")
                                                                    }

                                                                    {/*Category*/}
                                                                    {
                                                                        (category.position.length == 0) && general.category ? (
                                                                            <>
                                                                                <Category_Default data={category_props}/>
                                                                                {" " + meta.seperator}
                                                                            </>
                                                                        ) : ("")
                                                                    }



                                                                    {/*Tag*/}
                                                                    {/*{*/}
                                                                    {/*    general.tag ? (*/}
                                                                    {/*        <Tags data={tag_props}/>*/}
                                                                    {/*    ) : ("")*/}
                                                                    {/*}*/}

                                                                    {/*Comment count*/}
                                                                    {
                                                                        general.comment_count ? (
                                                                            <CommentCount data={comment_count_props}/>
                                                                        ) : ("")
                                                                    }

                                                                </MetaStyle_align>
                                                            ) : ("")
                                                        }

                                                        {
                                                            general.title ? (
                                                                <Titles data={title_props} />
                                                            ) : ('')
                                                        }

                                                        {
                                                            (meta.position == "between" || meta.position == "default") ? (
                                                                <MetaStyle_align css={meta_style} className="post-meta-user  ">


                                                                    {/*Post date*/}
                                                                    {
                                                                        general.post_date ? (
                                                                            <Date data={date_props}/>
                                                                        ) : ('')
                                                                    }
                                                                    {/*Author*/}
                                                                    {
                                                                        general.author ? (
                                                                            <Author data={author_props}/>
                                                                        ) : ("")
                                                                    }

                                                                    {/*Category*/}
                                                                    {
                                                                        (category.position.length == 0) && general.category ? (
                                                                            <>
                                                                                <Category_Default data={category_props}/>
                                                                                {" " + meta.seperator}
                                                                            </>
                                                                        ) : ("")
                                                                    }



                                                                    {/*Tag*/}
                                                                    {/*{*/}
                                                                    {/*    general.tag ? (*/}
                                                                    {/*        <Tags data={tag_props}/>*/}
                                                                    {/*    ) : ("")*/}
                                                                    {/*}*/}

                                                                    {/*Comment count*/}
                                                                    {
                                                                        general.comment_count ? (
                                                                            <CommentCount data={comment_count_props}/>
                                                                        ) : ("")
                                                                    }

                                                                </MetaStyle_align>
                                                            ) : ('')
                                                        }
                                                        {
                                                            general.excerpt ? (
                                                                <Excerpts css={excerpt_style} primary={primary_color} className="tpg-excerpt" dangerouslySetInnerHTML={{__html: postexcerpt}}>

                                                                </Excerpts>
                                                            ) : ("")
                                                        }

                                                        {
                                                            (meta.position == "below") ? (
                                                                <MetaStyle_align css={meta_style} className="post-meta-user  ">


                                                                    {/*Post date*/}
                                                                    {
                                                                        general.post_date ? (
                                                                            <Date data={date_props}/>
                                                                        ) : ('')
                                                                    }
                                                                    {/*Author*/}
                                                                    {
                                                                        general.author ? (
                                                                            <Author data={author_props}/>
                                                                        ) : ("")
                                                                    }

                                                                    {/*Category*/}
                                                                    {
                                                                        (category.position.length == 0) && general.category ? (
                                                                            <>
                                                                                <Category_Default data={category_props}/>
                                                                                {" " + meta.seperator}
                                                                            </>
                                                                        ) : ("")
                                                                    }



                                                                    {/*Tag*/}
                                                                    {/*{*/}
                                                                    {/*    general.tag ? (*/}
                                                                    {/*        <Tags data={tag_props}/>*/}
                                                                    {/*    ) : ("")*/}
                                                                    {/*}*/}

                                                                    {/*Comment count*/}
                                                                    {
                                                                        general.comment_count ? (
                                                                            <CommentCount data={comment_count_props}/>
                                                                        ) : ("")
                                                                    }

                                                                </MetaStyle_align>
                                                            ) : ('')
                                                        }

                                                        {/*See more button*/}
                                                        {
                                                            general.see_more ? (
                                                                <Btn_align css_btn={button} className="read-more" >
                                                                    <Button_style css={button_style} lay_sty={layout} css_pad={button_padding} css_mar={button_margin} primary={primary_color} target={linking.target} css_btn={button} data-id={post.id} className="see_more_button" href={post.post_link}>
                                                                        {button.text}
                                                                    </Button_style>
                                                                </Btn_align>
                                                            ) : ("")
                                                        }
                                                    </Content_padding>
                                                </ContentCol>
                                            </div>
                                        </Content_wrap>
                                    </Colgut>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
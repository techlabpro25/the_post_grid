import {
    PanelBody,
    __experimentalUnitControl as UnitControl,
	__experimentalNumberControl as NumberControl,
    SelectControl,
    ToggleControl ,
    RangeControl
} from "@wordpress/components";
import { useState, useEffect } from '@wordpress/element';
import apiFetch from "@wordpress/api-fetch";

function Image(props) {
    const {__} = wp.i18n;
    const { image, layout, category } = props.attr.attributes
    const [ showimage, setShowimage ] = useState( true );
    const [sizes, setSizes] = useState([])

    // Get all Image Size
    useEffect(() => {
        apiFetch({ path: "/rt/v1/image-size" }).then((sizes) => {
            setSizes(sizes)
        })
    }, []);

    return (
        <PanelBody title={__( "Image", "the-post-grid")} initialOpen={false}>
            <ToggleControl
                className={"rt-togglecontrol image"}
                label={__( "Show Image", "the-post-grid")}
                checked={ image.show_hide }
                onChange={ (val) => {
                    setShowimage( ( state ) => ! state );
                    if(val == false){
                        props.attr.setAttributes({category: {...category, "position": ""}})
                    }
                    props.attr.setAttributes({image: {...image, "show_hide": val}})
                } }
            />

            {
                image.show_hide?(
                    <SelectControl
                        className={"rt-selectcontrol image"}
                        label={__( "Featured Image Size:", "the-post-grid")}
                        value={ image.size }
                        options={ sizes }
                        onChange={ ( value ) => props.attr.setAttributes( {image: {...image, "size": value} } ) }
                    />

                ):("")
            }

            {((layout.value == "list1")|| (layout.value == "list2"))? (
                <>
                    <SelectControl
                        className={"rt-selectcontrol image"}
                        label={__( "Image Column:", "the-post-grid")}
                        value={ image['img-column'] }
                        options={ [
                            { label: __( 'Column 1', "the-post-grid"), value: '1' },
                            { label: __( 'Column 2', "the-post-grid"), value: '2' },
                            { label: __( 'Column 3', "the-post-grid"), value: '3' },
                            { label: __( 'Column 4', "the-post-grid"), value: '4' },
                        ] }
                        onChange={ ( value ) => props.attr.setAttributes( {image: {...image, "img-column": value, "content-column": (12 - value)} } ) }
                    />

                    <NumberControl
                        className={"rt-numbercontrol image"}
                        label={__( "Gutter Control:", "the-post-grid")}
                        value={ image.gutter }
                        onChange={ ( value ) => props.attr.setAttributes( {image: {...image, "gutter": value} } ) }
                        min={ 0 }
                        max={ 100 }
                        step={1}
                    />
                </>
            ):("")}


            <SelectControl
                className={"rt-selectcontrol image"}
                label={__( "Hover Animation:", "the-post-grid")}
                value={ image.animation }
                options={ [
                    { label: __( 'None', "the-post-grid"), value: "img_no_effect" },
                    { label: __( 'Zoom In', "the-post-grid"), value: 'img_zoom_in'},
                    { label: __( 'Zoom Out', "the-post-grid"), value: 'img_zoom_out' },
                ] }
                onChange={ ( value ) => props.attr.setAttributes( {image: {...image, "animation": value} } ) }
            />

            <UnitControl
                className={"rt-unitcontrol image"}
                units={[{label: "px", value: "px"}, {label: "%", value: "%"}]}
                label={__('Border Radius', 'the-post-grid')}
                onChange={ ( value ) => props.attr.setAttributes( { image: {...image, "border-radius": value} })}
                shiftStep={ 1 }
                value={ image["border-radius"] }
            />

        </PanelBody>
    );
}

export default Image;
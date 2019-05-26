import React from 'react';
import Dropzone from "react-dropzone";

import Progress from "../Progress";

const styles = {
    height: 200,
    width: 200,
    margin: "0 auto",
    cursor: "pointer",
    position: "relative"
};


const FileUpload = ({image, upload, remove, loading}) => {
    const onDrop = files => {
        const formData = new FormData();
        formData.append("file", files[0]);
        upload(formData);
    };

    const classes = "btn border mb-3 d-flex justify-content-center align-items-center";
    if (image && Object.keys(image).length && !loading) {
        return (
            <div className={classes} style={styles}>
                <div onClick={() => remove(image.publicId)}
                     style={{background: `url(${image.url}) no-repeat`, backgroundSize: "cover", ...styles}}/>
            </div>
        )
    }

    return (
        <Dropzone onDrop={onDrop} multiple={false}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} style={styles} className={classes}>
                    {
                        loading ? <Progress addStyles={{position: "initial"}}/> :
                            <>
                                <input {...getInputProps()} />
                                <i className="fas fa-plus"/>
                            </>
                    }
                </div>
            )}
        </Dropzone>
    );
};

export default FileUpload;
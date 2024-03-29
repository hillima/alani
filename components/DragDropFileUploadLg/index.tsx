/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as Imagess } from '../../styles/index.styled';
import {
  Container,
  FileTypeDescription,
  UploadButton,
  UploadError,
  RemovePreviewIcon,
  Preview,
  ImageInfo,
  FilenameInfo,
  PreviewImageContainer,
  FileNameText,
  FileSize,
} from './DragDropFileUploadLg.styled';
import {
  GLB_FILE_SIZE_UPLOAD_LIMIT,
  LG_FILE_UPLOAD_TYPES_TEXT,
  LG_GLB_UPLOAD_TYPES_TEXT,
  SM_FILE_SIZE_UPLOAD_LIMIT,
} from '../../utils/constants';
import { fileReader } from '../../utils';
import Image from 'next/image';

type Props = {
  setTemplateUploadedFile: Dispatch<SetStateAction<File>>;
  templateUploadedFile: File;
  setUploadedFilePreview: Dispatch<SetStateAction<string>>;
  uploadedFilePreview: string;
  isGlb?: boolean;
};

const DragDropFileUploadLg = ({
  setTemplateUploadedFile,
  templateUploadedFile,
  uploadedFilePreview,
  setUploadedFilePreview,
  isGlb,
}: Props): JSX.Element => {
  const onDrop = useCallback((acceptedFiles) => {
    setUploadError('');
    const file = acceptedFiles[0];
    const isAcceptedFileSize = isGlb ? file.size <= GLB_FILE_SIZE_UPLOAD_LIMIT : file.size <= SM_FILE_SIZE_UPLOAD_LIMIT; // GLB 10MB | Thumb 5MB
    if (!isGlb && acceptedFiles[0].type == '') {
      return setUploadError(
        'Unable to upload, please double check your file type.'
      );
    }
    if (isGlb && acceptedFiles[0].type != '') {
      return setUploadError(
        'Unable to upload, please double check your file type.'
      );
    }
    if (isAcceptedFileSize) {
      setUploadedFilePreview(null);
      setTemplateUploadedFile(file);
      fileReader((result) => setUploadedFilePreview(result), file);
    } else {
      setTemplateUploadedFile(null);
      setUploadedFilePreview('');
      setUploadError(
        'Unable to upload, please double check your file size or file type.'
      );
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [uploadError, setUploadError] = useState<string>('');

  const extToMime = {
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.glb': 'model/gltf-binary',
    '.mp4': 'video/mp4'
  };
  const accept =
    Object.values(extToMime).join(',') + ',' + Object.keys(extToMime).join(',');
  
  return (
    <Container {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} accept={accept} />
      {templateUploadedFile && uploadedFilePreview ? (
        <Preview>
          <ImageInfo>
            <PreviewImageContainer>
              {templateUploadedFile.type.includes('mp4') ? (
                <video
                  width="64"
                  height="64"
                  muted
                  playsInline
                  src={`${uploadedFilePreview}`}
                />
              ) : isGlb ? null : (
                <Imagess
                  width="64px"
                  height="64px"
                  objectFit="contain"
                  alt={templateUploadedFile.name}
                  src={uploadedFilePreview}
                />
              )}
            </PreviewImageContainer>
            <FilenameInfo>
              <FileNameText>{templateUploadedFile.name}</FileNameText>
              <FileSize>
                {(templateUploadedFile.size / 1000).toFixed(2)} kb
              </FileSize>
            </FilenameInfo>
          </ImageInfo>
          <RemovePreviewIcon
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              setTemplateUploadedFile(null);
              setUploadedFilePreview('');
            }}>
            <Image src="/close.svg" width={16} height={16} />
          </RemovePreviewIcon>
        </Preview>
      ) : isDragActive ? (
        <>
          <Image src="/upload-icon.svg" width={16} height={16} />
          <FileTypeDescription>{LG_FILE_UPLOAD_TYPES_TEXT}</FileTypeDescription>
        </>
      ) : (
        <>
          <FileTypeDescription>
            {isGlb ? LG_GLB_UPLOAD_TYPES_TEXT : LG_FILE_UPLOAD_TYPES_TEXT}
          </FileTypeDescription>
          {uploadError ? <UploadError>{uploadError}</UploadError> : null}
          <UploadButton role="button">
            {isGlb ? 'Choose Glb' : 'Choose file'}
          </UploadButton>
        </>
      )}
    </Container>
  );
};

export default DragDropFileUploadLg;

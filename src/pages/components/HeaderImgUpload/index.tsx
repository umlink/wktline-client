import { useBoolean } from 'ahooks';
import { message, Spin, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import './upload.less';

type HeaderImgProps = {
  headerImg: UploadFile;
  tips?: string;
  maxSize?: number;
  size?: number;
  aspect?: number;
  onChange?: (file: UploadFile) => void;
};
const HeaderImgUpload = (props: HeaderImgProps) => {
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const onChange: UploadProps['onChange'] = ({ fileList }) => {
    setTrue();
    fileList.map((file) => {
      if (file.response) {
        file.url = file.response.data.url;
        file.uid = file.response.data.id;
        if (typeof props.onChange === 'function' && props.headerImg.url !== file.url) {
          setFalse();
          props.onChange(file);
        }
      }
      return file;
    });
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: RcFile) => {
    const isIMG = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
    if (!isIMG) {
      message.error('You can only upload JPG/PNG file!');
    }
    const maxSize = props.maxSize || 2;
    const isOver = file.size / 1024 / 1024 < maxSize;
    if (!isOver) {
      message.error(`Image must smaller than ${maxSize}MB!`);
    }
    return isIMG && isOver;
  };
  const size = props.size || 120;
  const aspect = props.aspect || 1;
  return (
    <Upload
      className={'common-header-img-upload'}
      accept={'image/*'}
      action="/wkt-api/common/upload"
      listType="picture-card"
      beforeUpload={beforeUpload}
      onChange={onChange}
      onPreview={onPreview}
      showUploadList={false}
    >
      <div className={'relative flex items-center justify-center'} style={{ width: size, height: size / aspect }}>
        <Spin spinning={loading}>
          {!!props.headerImg.url ? (
            <img src={props.headerImg.url} alt="avatar" className={'w-full'} />
          ) : (
            props.tips || 'Upload'
          )}
        </Spin>
      </div>
    </Upload>
  );
};

export default HeaderImgUpload;

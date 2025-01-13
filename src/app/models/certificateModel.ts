export type Event = {
  title: string;
  date: string;
  location: string;
};

export type Signatory = {
  signature?: {
    url: string;
    publicId: string;
  };
  name?: string;
  position?: string;
  company?: string;
  _id?: string;
  certificateId?: string;
};

export type Certificate = {
  _id?: string;
  title: string;
  titleCaption: string;
  awardee: string;
  awardeeCaption: string;
  event: Event;
  message: string;
  signatories: Signatory[];
  status: string;
  presentedBy: string;

  type: string;
  category: string;
  isDefault: boolean;
  branding?: {
    background: {
      url: string;
      publicId: string;
    };
    logo: {
      left: {
        url: string;
        publicId: string;
      };
      right: {
        url: string;
        publicId: string;
      };
    };
    color: {
      information: {
        title: string;
        caption: string;
      };
      signature: {
        name: string;
        position: string;
        company: string;
      };
    };
    font: {
      information: {
        title: string;
        caption: string;
      };
      signature: {
        name: string;
        position: string;
        company: string;
      };
    };
    size: {
      paper: {
        height: string;
        width: string;
        measurement: string;
      };
    };
  };
};

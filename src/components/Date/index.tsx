import { parseISO, format } from "date-fns";

interface Props {
  date: string;
}

const Date: React.FunctionComponent<Props> = ({ date }) => {
  const parsedDate = parseISO(date);
  return <time dateTime={date}>{format(parsedDate, "LLLL d, yyyy")}</time>;
};

export default Date;

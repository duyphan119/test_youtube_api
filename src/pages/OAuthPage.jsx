import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiOAuthLogin } from "../api/apiAuth";

const OAuthPage = () => {
  const [queryParams] = useSearchParams();
  const code = queryParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    apiOAuthLogin(code, dispatch, navigate);
  }, [code, dispatch, navigate]);
  return <></>;
};

export default OAuthPage;
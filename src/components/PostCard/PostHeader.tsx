// PostHeader.tsx
import React from "react";
import { View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Typography from "../Typography/Typography";
import { styles } from "./styles";
import { DEFAULT_AVATAR } from "../../utils/Constants";

const PostHeader = ({ userDetails, from, _id, onDelete }) => {
  const avatar = userDetails?.[0]?.profilePicture || DEFAULT_AVATAR;
  const username =
    (userDetails?.[0]?.firstName || "") +
    " " +
    (userDetails?.[0]?.lastName || "");
  const displayName = username.trim() || "Admin";

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View>
          <Typography style={styles.username}>{displayName}</Typography>
        </View>
      </View>
      {from === "myProfile" && (
        <Ionicons
          name="trash-outline"
          size={20}
          color="#f3718b"
          onPress={() => onDelete(_id)}
        />
      )}
    </View>
  );
};

export default PostHeader;

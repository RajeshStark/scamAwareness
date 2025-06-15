if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/rajeshsangapogu/.gradle/caches/8.13/transforms/16f05d867ceebf039e01cfd508327126/transformed/hermes-android-0.79.1-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rajeshsangapogu/.gradle/caches/8.13/transforms/16f05d867ceebf039e01cfd508327126/transformed/hermes-android-0.79.1-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

